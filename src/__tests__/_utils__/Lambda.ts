export const DEFAULT_LAMBDA_CONTEXT = {
    /**
     * @fixme Long values here are currently causing the Jest tests to run longer than expected.
     * This might or might not cause longer response times when running on the Lambda Node.js runtime.
     */
    getRemainingTimeInMillis: () => 5000,
    callbackWaitsForEmptyEventLoop: true,
}

export const DEFAULT_LAMBDA_EVENT = {
    type: 'mock_lambda_event',
}
