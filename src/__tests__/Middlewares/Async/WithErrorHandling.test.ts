import Ajv from 'ajv'

import {DEFAULT_HEADERS, successResponse} from '../../../Helpers/ApiGateway'
import {sleep} from '../../../Helpers/Promise'
import {withErrorHandling} from '../../../Middlewares/Async/WithErrorHandling'
import {ApiGatewayResponse} from '../../../Types/ApiGateway'

describe('Middlewares/Async/WithErrorHandling', () => {
    // Save original console.log function.
    const log = console.log

    // Create a new mock function for each test.
    beforeEach(() => {
        console.log = jest.fn()
    })

    // Restore original console.log after all tests.
    afterAll(() => {
        console.log = log
    })

    const lambdaContext = {
        getRemainingTimeInMillis: () => 5000,
        callbackWaitsForEmptyEventLoop: true,
    }

    test('withErrorHandling() can return success response', async () => {
        const response = successResponse({success: true})
        const handler = () => Promise.resolve(response)
        const onError = jest.fn()
        const onTimeout = jest.fn()
        const onInvalidResponse = jest.fn()
        await expect(
            withErrorHandling(handler, onError, onTimeout, onInvalidResponse)({}, lambdaContext),
        ).resolves.toEqual(response)
        expect(onError).not.toHaveBeenCalled()
        expect(onTimeout).not.toHaveBeenCalled()
        expect(onInvalidResponse).not.toHaveBeenCalled()
    })

    test('withErrorHandling() can disable event logging', async () => {
        const response = successResponse({success: true})
        const handler = () => Promise.resolve(response)
        await expect(
            withErrorHandling(handler, jest.fn(), jest.fn(), jest.fn(), {logEvent: false, timeoutGraceMs: 200})(
                {},
                lambdaContext,
            ),
        ).resolves.toEqual(response)
        expect(console.log).toHaveBeenCalledWith(
            expect.stringContaining('Will not log lambda event (options.logEvent=false)'),
        )
    })

    test('withErrorHandling() can disable result logging', async () => {
        const response = successResponse({success: true})
        const handler = () => Promise.resolve(response)
        await expect(
            withErrorHandling(handler, jest.fn(), jest.fn(), jest.fn(), {logResult: false, timeoutGraceMs: 200})(
                {},
                lambdaContext,
            ),
        ).resolves.toEqual(response)
        expect(console.log).toHaveBeenCalledWith(
            expect.stringContaining('Will not log result (options.logResult=false)'),
        )
    })

    test('withErrorHandling() can handle handler throwing errors', async () => {
        const error = new Error('Something went wrong!')
        const handler = () => {
            throw error
        }
        const onError = jest.fn(async () => {
            return {statusCode: 400, body: 'ERROR', headers: DEFAULT_HEADERS} satisfies ApiGatewayResponse
        })
        await expect(withErrorHandling(handler, onError, jest.fn(), jest.fn())({}, lambdaContext)).resolves.toEqual({
            statusCode: 400,
            headers: DEFAULT_HEADERS,
            body: 'ERROR',
        })
        expect(onError).toHaveBeenCalledWith(error, expect.any(Number))
    })

    test('withErrorHandling() can handle handler timing out', async () => {
        const lambdaContextShortTimeout = {
            getRemainingTimeInMillis: () => 1,
            callbackWaitsForEmptyEventLoop: true,
        }

        const handler = async () => {
            await sleep(1000)
            return successResponse(null)
        }
        const onTimeout = jest.fn(async () => {
            return {statusCode: 400, body: 'TIMEOUT', headers: DEFAULT_HEADERS} satisfies ApiGatewayResponse
        })
        await expect(
            withErrorHandling(handler, jest.fn(), onTimeout, jest.fn(), {timeoutGraceMs: 0})(
                {},
                lambdaContextShortTimeout,
            ),
        ).resolves.toEqual({
            statusCode: 400,
            headers: DEFAULT_HEADERS,
            body: 'TIMEOUT',
        })
        expect(onTimeout).toHaveBeenCalledWith(expect.any(Number))
    })

    test('withErrorHandling() can handle invalid response', async () => {
        const handler = async () => {
            return successResponse(null)
        }
        const ajv = new Ajv()
        const validator = ajv.compile({type: 'object'})
        const onInvalidResponse = jest.fn()
        await expect(
            withErrorHandling(handler, jest.fn(), jest.fn(), onInvalidResponse, {validator})({}, lambdaContext),
        ).resolves.toEqual({
            statusCode: 200,
            headers: DEFAULT_HEADERS,
            body: '{"data":null}',
        })
        expect(onInvalidResponse).toHaveBeenCalledWith({}, '{"data":null}', [
            {
                instancePath: '',
                keyword: 'type',
                message: 'must be object',
                params: {type: 'object'},
                schemaPath: '#/type',
            },
        ])
    })
})
