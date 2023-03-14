export type LambdaContext = {
    readonly getRemainingTimeInMillis: () => number
    callbackWaitsForEmptyEventLoop: boolean
}

export type LambdaTestEvent = {
    [key: string]: unknown
}
