import {HttpServerError, isHttpError} from '../../Helpers/HttpError'
import type {ApiGatewayResponse} from '../../Types/ApiGateway'
import type {AsyncHandler} from '../../Types/Handler'
import type {HttpErrorContext} from '../../Types/HttpError'
import type {LambdaContext} from '../../Types/Lambda'

/**
 * Middleware that turns all HTTP 4xx (client errors) into HTTP 500 (Internal Server Error).
 */
export const rethrowClientErrors =
    <T extends object>(handler: AsyncHandler<T>, errorContext: HttpErrorContext): AsyncHandler<T> =>
    async (event: T, context: LambdaContext): Promise<ApiGatewayResponse> => {
        try {
            return await handler(event, context)
        } catch (error: unknown) {
            if (isHttpError(error) && error.statusCode >= 400 && error.statusCode < 500) {
                throw HttpServerError({
                    help: 'in rethrowClientErrors(): handler errored out',
                    metatype: 'Rethrown client error',
                    event,
                    previousError: error,
                    ...errorContext,
                })
            } else {
                throw error
            }
        }
    }
