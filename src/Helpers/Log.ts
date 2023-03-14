import stringify from 'json-stringify-safe'

export const jsonStringifySafe = stringify

export const logJson = <T extends object | unknown[]>(value: T): void => {
    console.log(jsonStringifySafe(value, undefined, 2))
}

export const logJsonWithHeader = <T extends object | unknown[]>(header: string, value: T): void => {
    console.log(header)
    logJson(value)
}

export const logLambdaEvent = <T extends object>(event: T): void => {
    logJsonWithHeader('[LAMBDA EVENT]', event)
}
