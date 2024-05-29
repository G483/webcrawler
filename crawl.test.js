const {normalizeURL} = require('./crawl.js')
const { test, expect } = require('@jest/globals')

test('normalizeURL strips protocol', () => {
    const input = 'https://blog.boot.dev/path/'
    const actual  = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('normalizeURL strips trailing slash', () => {
    const input = 'https://blog.boot.dev/path/'
    const actual  = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('normalizeURL ignores capitals', () => {
    const input = 'https://BLOG.boot.dev/path/'
    const actual  = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})