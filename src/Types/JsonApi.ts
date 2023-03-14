import type {NonEmptyArray} from './Array'

/**
 * An implementation of the JSON API error object (https://jsonapi.org/format/#errors).
 */
export type JsonApiError = {
    readonly id?: string
    readonly status: number
    readonly detail: string
    readonly code: string
}

/**
 * An implementation of the JSON API error response (https://jsonapi.org/format/#errors).
 */
export type JsonApiErrorResponse<U> = {
    readonly errors: NonEmptyArray<JsonApiError>
    readonly meta?: U
}

/**
 * An implementation of the JSON API meta object (https://jsonapi.org/format/#document-meta).
 */
export type JsonApiMeta = {
    readonly [key: string]: unknown
}

export type JsonApiSuccessResponse<T, U = JsonApiMeta> = {
    readonly data: T
    readonly meta?: U
}

export type JsonApiResponse<T, U> = JsonApiSuccessResponse<T, U> | JsonApiErrorResponse<U>

export type DefaultJsonApiErrorResponse = JsonApiErrorResponse<JsonApiMeta>

export type NullJsonApiSuccessResponse = JsonApiSuccessResponse<null>

export type UnknownJsonApiSuccessResponse = JsonApiSuccessResponse<unknown>
