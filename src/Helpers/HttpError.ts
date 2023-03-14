import {BaseHttpErrorCodes, HttpError, HttpErrorContextWithHelp} from '../Types/HttpError'

export const isHttpError = (error: unknown): error is HttpError<unknown> =>
    typeof error === 'object' && error !== null && 'statusCode' in error && 'errorCode' in error

export const HttpServerError = (
    context: HttpErrorContextWithHelp,
    extraProps?: Partial<Omit<HttpError<BaseHttpErrorCodes>, 'context'>>,
): HttpError<BaseHttpErrorCodes> => ({
    statusCode: 500,
    errorCode: BaseHttpErrorCodes.InternalServerError,
    context,
    ...extraProps,
})
