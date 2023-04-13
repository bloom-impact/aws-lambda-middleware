import {unzip} from 'zlib'

import type {CloudWatchScheduledEvent, CloudWatchTriggeredEvent} from '../Types/CloudWatch'

/**
 * @fixme Improve this.
 */
export const isCloudWatchScheduledEvent = (event: object): event is CloudWatchScheduledEvent => 'time' in event

export const isCloudWatchTriggeredEvent = (event: object): event is CloudWatchTriggeredEvent =>
    'awslogs' in event &&
    typeof event.awslogs === 'object' &&
    event.awslogs !== null &&
    'data' in event.awslogs &&
    typeof event.awslogs.data === 'string'

export const unzipPromise = (buffer: Buffer): Promise<string> => {
    return new Promise((resolve, reject) => {
        unzip(buffer, (error, result) => {
            if (error !== null) {
                reject(error)
            } else {
                resolve(result.toString('ascii'))
            }
        })
    })
}
