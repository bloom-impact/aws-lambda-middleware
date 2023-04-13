import {gzip} from 'zlib'

import {isCloudWatchScheduledEvent, isCloudWatchTriggeredEvent, unzipPromise} from '../../Helpers/CloudWatch'

export const gzipPromise = (buffer: Buffer): Promise<Buffer> => {
    return new Promise((resolve, reject) => {
        gzip(buffer, (error, result) => {
            if (error !== null) {
                reject(error)
            } else {
                resolve(result)
            }
        })
    })
}

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

    test('gzipPromise() and unzipPromise()', async () => {
        const input = {data: [1, 2, 3]}
        const base64data = (await gzipPromise(Buffer.from(JSON.stringify(input), 'ascii'))).toString('base64')
        expect(base64data).toEqual('H4sIAAAAAAAAE6tWSkksSVSyijbUMdIxjq0FAM8/TwkQAAAA')
        expect(JSON.parse(await unzipPromise(Buffer.from(base64data, 'base64')))).toEqual(input)
    })

    test('unzipPromise() erroring', async () => {
        await expect(unzipPromise(Buffer.from('', 'base64'))).rejects.toEqual(expect.anything())
    })
})
