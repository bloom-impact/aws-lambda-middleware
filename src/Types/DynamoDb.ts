import type {AttributeValue} from '@aws-sdk/client-dynamodb'

export enum DynamoDbRecordEventName {
    INSERT = 'INSERT',
    MODIFY = 'MODIFY',
    REMOVE = 'REMOVE',
}

export enum DynamoDbRecordEventVersion {
    LATEST = '1.1',
}

export enum DynamoDbRecordEventSource {
    AWS = 'aws:dynamodb',
}

export enum DynamoDbObjectStreamViewType {
    NEW_AND_OLD_IMAGES = 'NEW_AND_OLD_IMAGES',
}

export interface DynamoDbObject {
    ApproximateCreationDateTime: number
    Keys: {[key: string]: AttributeValue}
    OldImage?: {[key: string]: AttributeValue}
    NewImage?: {[key: string]: AttributeValue}
    SequenceNumber: string
    SizeBytes: number
    StreamViewType: DynamoDbObjectStreamViewType
}

export interface DynamoDbRecord {
    eventId: string
    eventName: DynamoDbRecordEventName
    eventVersion: DynamoDbRecordEventVersion
    eventSource: DynamoDbRecordEventSource
    awsRegion: string
    dynamodb: DynamoDbObject
    eventSourceARN: string
}

export interface DynamoDbEvent {
    Records: DynamoDbRecord[]
}
