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
