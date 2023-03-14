import {successResponse} from '../../../Helpers/ApiGateway'
import {rethrowClientErrors} from '../../../Middlewares/Async/RethrowClientErrors'
import {BaseHttpErrorCodes, HttpError} from '../../../Types/HttpError'
import {DEFAULT_LAMBDA_CONTEXT, DEFAULT_LAMBDA_EVENT} from '../../_utils__/Lambda'

describe('Middlewares/Async/RethrowClientErrors', () => {
    test('rethrowClientErrors() can return success response', async () => {
        const response = successResponse({success: true})
        const handler = () => Promise.resolve(response)
        await expect(
            rethrowClientErrors(handler, {data: 1})(DEFAULT_LAMBDA_EVENT, DEFAULT_LAMBDA_CONTEXT),
        ).resolves.toEqual(response)
    })

    test('rethrowClientErrors() can rethrow client errors', async () => {
        const handler = () => {
            throw {statusCode: 400, errorCode: BaseHttpErrorCodes.RequestTimeout} satisfies HttpError
        }
        await expect(
            rethrowClientErrors(handler, {data: 1})(DEFAULT_LAMBDA_EVENT, DEFAULT_LAMBDA_CONTEXT),
        ).rejects.toEqual({
            context: {
                data: 1,
                event: DEFAULT_LAMBDA_EVENT,
                help: 'in rethrowClientErrors(): handler errored out',
                metatype: 'Rethrown client error',
                previousError: {
                    errorCode: 'RequestTimeout',
                    statusCode: 400,
                },
            },
            errorCode: 'InternalServerError',
            statusCode: 500,
        })
    })

    test('rethrowClientErrors() can rethrow server errors', async () => {
        const handler = () => {
            throw {statusCode: 500, errorCode: BaseHttpErrorCodes.InternalServerError} satisfies HttpError
        }
        await expect(
            rethrowClientErrors(handler, {data: 1})(DEFAULT_LAMBDA_EVENT, DEFAULT_LAMBDA_CONTEXT),
        ).rejects.toEqual({
            statusCode: 500,
            errorCode: BaseHttpErrorCodes.InternalServerError,
        })
    })
})
