import type {ValidateFunction} from 'ajv'

import {logJsonWithHeader, logLambdaEvent} from '../../Helpers/Log'
import {sleep} from '../../Helpers/Promise'
import type {ApiGatewayResponse} from '../../Types/ApiGateway'
import type {AsyncHandler} from '../../Types/Handler'
import type {LambdaContext} from '../../Types/Lambda'

type WithErrorHandlingOptions<R> = {
    /**
     * Grace period (in ms).
     * If this value is too low, the Lambda might be terminated before/during the execution of the `onError` callback.
     */
    readonly timeoutGraceMs?: number
    readonly validator?: ValidateFunction<R>
    readonly logEvent?: boolean
    /**
     * Whether or not the events should be logged.
     * Should be set to false if the event contains sensitive information, like passwords, PINs, etc.
     */
    readonly logResult?: boolean
}

/**
 * Middleware that wraps an arbitrary Lambda `handler` into a function that handles error handling (including Lambda timeout), using the `onError` and `onTimeout` callbacks.
 */
export const withErrorHandling =
    <T extends object, R>(
        handler: AsyncHandler<T>,
        onError: (error: unknown, durationMs: number) => Promise<ApiGatewayResponse>,
        onTimeOut: (durationMs: number) => Promise<ApiGatewayResponse>,
        onInvalidResponse: () => Promise<void>,
        options?: WithErrorHandlingOptions<R>,
    ): AsyncHandler<T> =>
    async (event: T, context: LambdaContext): Promise<ApiGatewayResponse> => {
        if (options?.logEvent !== false) {
            logLambdaEvent(event)
        } else {
            console.log('Will not log lambda event (options.logEvent=false)')
        }

        const start = new Date()
        const startMs = start.getTime()
        try {
            // Race the handler promise, with a sleep promise to detect timeouts (minus 2000ms, to leave time for error sending)
            const response = await Promise.race([
                handler(event, context),
                sleep(context.getRemainingTimeInMillis() - (options?.timeoutGraceMs ?? 2000)),
            ])
            if (response === null) {
                // The handler promise timed out
                return await onTimeOut(new Date().getTime() - startMs)
            }

            if (options?.logResult !== false) {
                logJsonWithHeader('[RESULT]', response)
            } else {
                console.log('Will not log result (options.logResult=false)')
            }

            // Optional: If provided, validate the result using the validator.
            // NB: If the validation fails, we will still return the payload.
            if (options?.validator !== undefined) {
                const {validator} = options
                // Try validating the response body
                const valid = validator(response.body)
                if (!valid) {
                    await onInvalidResponse()
                }
            }

            return response
        } catch (error: unknown) {
            return await onError(error, new Date().getTime() - startMs)
        }
    }
