import {logJson, logJsonWithHeader, logLambdaEvent} from '../../Helpers/Log'

describe('Helpers/Log', () => {
    // Save original console.log function.
    const log = console.log

    // Create a new mock function for each test.
    beforeEach(() => {
        console.log = jest.fn()
    })

    // Restore original console.log after all tests.
    afterAll(() => {
        console.log = log
    })

    test('logJson()', () => {
        expect(console.log).not.toHaveBeenCalled()
        logJson({})
        expect(console.log).toHaveBeenCalledWith(expect.stringContaining('{}'))
    })

    test('logJsonWithHeader()', () => {
        expect(console.log).not.toHaveBeenCalled()
        logJsonWithHeader('[HEADER]', {})
        expect(console.log).toHaveBeenCalledWith(expect.stringContaining('[HEADER]'))
        expect(console.log).toHaveBeenCalledWith(expect.stringContaining('{}'))
    })

    test('logLambdaEvent()', () => {
        expect(console.log).not.toHaveBeenCalled()
        logLambdaEvent({data: 1})
        expect(console.log).toHaveBeenCalledWith(expect.stringContaining('[LAMBDA EVENT]'))
        expect(console.log).toHaveBeenCalledWith(expect.stringContaining('{\n  "data": 1\n}'))
    })
})
