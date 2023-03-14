import type {ApiGatewayEvent, ApiGatewayHeaders, ApiGatewayResponse} from '../Types/ApiGateway'
import type {JsonApiMeta, JsonApiResponse} from '../Types/JsonApi'

export const DEFAULT_HEADERS: ApiGatewayHeaders = {
    /**
     * @fixme Restrict this in production.
     */
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': '*',
    /**
     * @fixme Make this a config option.
     */
    'Access-Control-Allow-Headers': 'Cache-Signature',
}

/**
 * Return an API Gateway success response (based on the JSON API specification).
 * If provided, a `validator` function is run on the JSON API response, and throws an `HttpError`.
 * Note that the error can be caught, and the response (which is present in the error context) still returned.
 */
export const successResponse = <T, U extends object = JsonApiMeta>(data: T, meta?: U): ApiGatewayResponse => {
    const response: JsonApiResponse<T, U> = {data, meta}

    return {
        statusCode: 200,
        body: JSON.stringify(response),
        headers: DEFAULT_HEADERS,
    }
}

export const isApiGatewayEvent = (event: unknown): event is ApiGatewayEvent =>
    typeof event === 'object' && event !== null && 'body' in event && 'httpMethod' in event
