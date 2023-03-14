import type {CloudWatchScheduledEvent} from '../Types/CloudWatch'

/**
 * @fixme Improve this.
 */
export const isCloudWatchScheduledEvent = (event: object): event is CloudWatchScheduledEvent => 'time' in event
