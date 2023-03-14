import {successResponse} from '../../Helpers/ApiGateway'
import {logJsonWithHeader} from '../../Helpers/Log'
import type {ApiGatewayResponse} from '../../Types/ApiGateway'
import type {AsyncHandler} from '../../Types/Handler'
import type {LambdaContext} from '../../Types/Lambda'

/**
 * Middleware that sends error emails on HTTP errors, and returns a HTTP 200.
 */
export const silenceErrors =
    <T extends object>(handler: AsyncHandler<T>, onError: (error: unknown) => Promise<void>): AsyncHandler<T> =>
    async (event: T, context: LambdaContext): Promise<ApiGatewayResponse> => {
        try {
            return await handler(event, context)
        } catch (error: unknown) {
            try {
                await onError(error)
            } catch (_error: unknown) {
                logJsonWithHeader('[ERROR]', {help: `Caught _error while processing error. Aborting.`, error, _error})
            }
            return successResponse(null)
        }
    }
