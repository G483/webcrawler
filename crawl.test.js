const {normalizeURL, getURLsFromHTML} = require('./crawl.js')
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

test('getURLsFromHTML returns an array of urls', () => {
    const html = `
<html>
<body>
    <a href="https://blog.boot.dev/path/">Some link text</a>
</body>
</html>`

    const actual = getURLsFromHTML(html)
    const expected = ['https://blog.boot.dev/path/']
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML returns full urls from relative path', () => {
    const html = `
<html>
<body>
    <a href="/path/test">Some link text</a>
</body>
</html>`
    const baseURL = 'https://blog.boot.dev'
    const actual = getURLsFromHTML(html, baseURL)
    const expected = ['https://blog.boot.dev/path/test']
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML ', () => {
    const html = `
<html>
<body>
    <a href="invalid">Invalid URL</a>
</body>
</html>`
    const baseURL = 'https://blog.boot.dev'
    const actual = getURLsFromHTML(html, baseURL)
    const expected = []
    expect(actual).toEqual(expected)
})