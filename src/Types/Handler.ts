import type {ApiGatewayEvent, ApiGatewayResponse} from './ApiGateway'
import type {DynamoDbEvent} from './DynamoDb'
import type {LambdaContext} from './Lambda'

export type AsyncHandler<T extends object> = (event: T, context: LambdaContext) => Promise<ApiGatewayResponse>

export type AsyncApiGatewayEventHandler = AsyncHandler<ApiGatewayEvent>

export type AsyncDynamodbDbStreamEventHandler = AsyncHandler<DynamoDbEvent>
