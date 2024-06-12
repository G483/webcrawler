const { printReport } = require('./report');
const { test, expect } = require('@jest/globals')

test('printReport prints the report in correct order', () => {
    const baseURL = 'https://blog.boot.dev'
    const pages = {
        'https://blog.boot.dev/path': 2,
        'https://blog.boot.dev/path2': 1,
        'https://blog.boot.dev/path3': 3,
    }

    const consoleSpy = jest.spyOn(console, 'log');
    printReport(baseURL, pages)

    expect(consoleSpy).toHaveBeenCalledWith('Report for https://blog.boot.dev is starting') 
    expect(consoleSpy).toHaveBeenCalledWith('Found 3 internal links to https://blog.boot.dev/path3')
    expect(consoleSpy).toHaveBeenCalledWith('Found 2 internal links to https://blog.boot.dev/path') 
    expect(consoleSpy).toHaveBeenCalledWith('Found 1 internal links to https://blog.boot.dev/path2')
})
