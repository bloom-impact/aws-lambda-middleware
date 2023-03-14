import {DEFAULT_HEADERS, isApiGatewayEvent, successResponse} from '../../Helpers/ApiGateway'

describe('Helpers/ApiGateway', () => {
    test('successResponse()', () => {
        expect(successResponse(100)).toEqual({
            statusCode: 200,
            body: '{"data":100}',
            headers: DEFAULT_HEADERS,
        })
    })

    test('isApiGatewayEvent()', () => {
        expect(isApiGatewayEvent({})).toEqual(false)
        expect(isApiGatewayEvent({body: '', httpMethod: 'GET'})).toEqual(true)
    })
})
