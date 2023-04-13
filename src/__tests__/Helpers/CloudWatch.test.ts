import {isCloudWatchScheduledEvent, isCloudWatchTriggeredEvent} from '../../Helpers/CloudWatch'

describe('Helpers/CloudWatch', () => {
    test('isCloudWatchScheduledEvent()', () => {
        expect(isCloudWatchScheduledEvent({})).toEqual(false)
        expect(isCloudWatchScheduledEvent({time: '1970-01-01T00:00:00Z'})).toEqual(true)
    })

    test('isCloudWatchTriggeredEvent()', () => {
        expect(isCloudWatchTriggeredEvent({})).toEqual(false)
        expect(isCloudWatchTriggeredEvent({time: '1970-01-01T00:00:00Z'})).toEqual(false)
        expect(isCloudWatchTriggeredEvent({awslogs: 'some log'})).toEqual(false)
        expect(isCloudWatchTriggeredEvent({awslogs: {data: null}})).toEqual(false)
        expect(
            isCloudWatchTriggeredEvent({awslogs: {data: 'H4sIAAAAAAAAE6tWSkksSVSyUog21DHSMY6tBQAuoQv7EQAAAA=='}}),
        ).toEqual(true)
    })
})
