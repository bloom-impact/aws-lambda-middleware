import {DynamoDbRecordEventName} from '../../Types/DynamoDb'

describe('Types/DynamoDb', () => {
    test('DynamoDbRecordEventName', () => {
        expect(DynamoDbRecordEventName.INSERT).toEqual('INSERT')
    })
})
