const {normalizeURL} = require('./crawl.js')
const { test, expect } = require('@jest/globals')

test('normalizeURL strips protocol', () => {
    const input = 'https://blog.boot.dev/path'
    const actual  = normalizeURL(input)
    const expected = 'something else'
    expect(actual).toEqual(expected)
})
