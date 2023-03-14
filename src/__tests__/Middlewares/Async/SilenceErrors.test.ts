import {successResponse} from '../../../Helpers/ApiGateway'
import {silenceErrors} from '../../../Middlewares/Async/SilenceErrors'
import {DEFAULT_LAMBDA_CONTEXT, DEFAULT_LAMBDA_EVENT} from '../../_utils__/Lambda'

describe('Middlewares/Async/SilenceErrors', () => {
    test('silenceErrors() returns normally', async () => {
        const response = successResponse({success: true})
        const handler = () => Promise.resolve(response)
        const onError = jest.fn()
        await expect(silenceErrors(handler, onError)(DEFAULT_LAMBDA_EVENT, DEFAULT_LAMBDA_CONTEXT)).resolves.toEqual(
            response,
        )
        expect(onError).not.toHaveBeenCalled()
    })

    test('silenceErrors() errors', async () => {
        const response = successResponse(null)
        const error = new Error('Something went wrong')
        const handler = () => {
            throw error
        }
        const onError = jest.fn()
        await expect(silenceErrors(handler, onError)(DEFAULT_LAMBDA_EVENT, DEFAULT_LAMBDA_CONTEXT)).resolves.toEqual(
            response,
        )
        expect(onError).toHaveBeenCalledWith(error)
    })

    test('silenceErrors() can handle errors in `onError`', async () => {
        // Create a new mock function for each test.
        console.log = jest.fn()

        const response = successResponse(null)
        const error = new Error('Something went wrong')
        const handler = () => {
            throw error
        }
        const onError = async () => {
            throw new Error('Something went wrong again!')
        }
        await expect(silenceErrors(handler, onError)(DEFAULT_LAMBDA_EVENT, DEFAULT_LAMBDA_CONTEXT)).resolves.toEqual(
            response,
        )
        expect(console.log).toHaveBeenCalledWith(expect.stringContaining('[ERROR]'))
        expect(console.log).toHaveBeenCalledWith(
            expect.stringContaining(
                '{\n  "help": "Caught _error while processing error. Aborting.",\n  "error": {},\n  "_error": {}\n}',
            ),
        )
    })
})
