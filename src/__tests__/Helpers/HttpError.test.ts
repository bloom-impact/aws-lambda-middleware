import {HttpServerError, isHttpError} from '../../Helpers/HttpError'

describe('Helpers/HttpError', () => {
    test('HttpServerError()', () => {
        expect(HttpServerError({help: 'in __tests__/Helpers/HttpError.test.ts: testing errors', data: 1})).toEqual({
            statusCode: 500,
            errorCode: 'InternalServerError',
            context: {
                help: 'in __tests__/Helpers/HttpError.test.ts: testing errors',
                data: 1,
            },
        })
    })

    test('isHttpError()', () => {
        expect(isHttpError({})).toEqual(false)
        expect(isHttpError(new Error('Some error!'))).toEqual(false)
        expect(isHttpError(HttpServerError({help: 'new HttpError!'}))).toEqual(true)
    })
})
