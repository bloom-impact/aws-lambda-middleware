export enum BaseHttpErrorCodes {
    InternalServerError = 'InternalServerError',
    RequestTimeout = 'RequestTimeout',
}

export type HttpErrorContext = {
    [key: string]: unknown
}

export type HttpErrorContextWithHelp = HttpErrorContext & {
    readonly help: string
}

export type HttpError<HttpErrorCode = BaseHttpErrorCodes> = {
    readonly statusCode: number
    readonly errorCode: HttpErrorCode
    readonly publicErrorMessage?: string
    readonly context?: HttpErrorContext
}
