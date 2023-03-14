import {isJsonApiErrorResponse, isJsonApiResponse, isJsonApiSuccessResponse} from '../../Helpers/JsonApi'

test('isJsonApiResponse() works as expected', () => {
    expect(isJsonApiResponse({data: []})).toEqual(true)
    expect(isJsonApiResponse({errors: [{status: 400, detail: 'Details.', code: 'ErrorCode'}]})).toEqual(true)
    expect(isJsonApiResponse({})).toEqual(false)
})

test('isJsonApiErrorResponse() works as expected', () => {
    expect(isJsonApiErrorResponse({data: []})).toEqual(false)
    expect(isJsonApiErrorResponse({errors: [{status: 400, detail: 'Details.', code: 'ErrorCode'}]})).toEqual(true)
})

test('isJsonApiSuccessResponse() works as expected', () => {
    expect(isJsonApiSuccessResponse({data: []})).toEqual(true)
    expect(isJsonApiSuccessResponse({errors: [{status: 400, detail: 'Details.', code: 'ErrorCode'}]})).toEqual(false)
})
