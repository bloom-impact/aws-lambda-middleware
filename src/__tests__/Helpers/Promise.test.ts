import {sleep} from '../../Helpers/Promise'

describe('Helpers/Promise', () => {
    test('sleep()', async () => {
        await expect(sleep(100)).resolves.toEqual(null)
    })
})
