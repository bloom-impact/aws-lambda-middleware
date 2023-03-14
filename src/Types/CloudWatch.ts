export type CloudWatchScheduledEvent = {
    readonly version: '0'
    /**
     * @pattern ^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$
     */
    readonly id: string
    readonly 'detail-type': 'Scheduled Event'
    readonly source: 'aws.events'
    /**
     * @pattern ^[0-9]+$
     */
    readonly account: string
    /**
     * @pattern ^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}Z$
     */
    readonly time: string
    readonly region: 'ap-southeast-2'
    readonly ressources: string[]
    readonly details: object
}
