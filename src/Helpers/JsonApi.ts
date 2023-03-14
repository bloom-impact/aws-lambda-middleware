import {JsonApiErrorResponse, JsonApiMeta, JsonApiResponse, JsonApiSuccessResponse} from '../Types/JsonApi'

export const isJsonApiResponse = <T, U extends JsonApiMeta>(response: unknown): response is JsonApiResponse<T, U> =>
    typeof response === 'object' && response !== null && ('data' in response || 'errors' in response)

export const isJsonApiErrorResponse = <U extends JsonApiMeta>(response: unknown): response is JsonApiErrorResponse<U> =>
    isJsonApiResponse(response) && 'errors' in response && Array.isArray(response.errors) && response.errors.length > 0

export const isJsonApiSuccessResponse = <T, U extends JsonApiMeta>(
    response: unknown,
): response is JsonApiSuccessResponse<T, U> => isJsonApiResponse(response) && 'data' in response
