export type ApiGatewayHeaders = {
    [key: string]: string
}

export interface ApiGatewayAuthorizerClaims {
    sub: string
    aud: string
    email: string
    email_verified: boolean
    event_id: string
    token_use: 'id'
    auth_time: number
    iss: string
    'cognito:username': string
    exp: string
    iat: string
}

export interface ApiGatewayAuthorizer {
    claims: ApiGatewayAuthorizerClaims
}

export interface ApiGatewayRequestContextIdentity {
    cognitoIdentityPoolId: string | null
    accountId: string | null
    cognitoIdentityId: string | null
    caller: unknown | null
    sourceIp: string
    principalOrgId: unknown | null
    accessKey: unknown | null
    cognitoAuthenticationType: unknown | null
    cognitoAuthenticationProvider: unknown | null
    userArn: unknown | null
    userAgent: string
    user: unknown | null
}

export interface ApiGatewayRequestContext {
    resourceId: string
    resourcePath: string
    httpMethod: string
    extendedRequestId: string
    requestTime: string
    path: string
    accountId: string
    protocol: string
    stage: string
    domainPrefix: string
    requestTimeEpoch: number
    requestId: string
    identity: ApiGatewayRequestContextIdentity
    domainName: string
    apiId: string
    authorizer?: ApiGatewayAuthorizer
}

export interface ApiGatewayEvent {
    resource: string
    path: string
    httpMethod: string
    headers: ApiGatewayHeaders
    multiValueHeaders: {[key: string]: string[]}
    queryStringParameters: null | {[key: string]: string}
    multiValueQueryStringParameters: null | {[key: string]: string[]}
    pathParameters: {[key: string]: string} | null
    stageVariables: null
    requestContext: ApiGatewayRequestContext
    body: string | null
    isBase64Encoded: boolean
}

export interface ApiGatewayResponse {
    readonly statusCode: number
    readonly body: string
    readonly headers: ApiGatewayHeaders
    readonly isBase64Encoded?: boolean
}
