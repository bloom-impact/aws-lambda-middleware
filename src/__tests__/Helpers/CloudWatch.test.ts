import {isCloudWatchScheduledEvent} from '../../Helpers/CloudWatch'

describe('Helpers/CloudWatch', () => {
    test('isCloudWatchScheduledEvent()', () => {
        expect(isCloudWatchScheduledEvent({})).toEqual(false)
        expect(isCloudWatchScheduledEvent({time: '1970-01-01T00:00:00Z'})).toEqual(true)
    })
})
