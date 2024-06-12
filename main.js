const { argv } = require('node:process');
const {crawlPage} = require('./crawl')
const {printReport} = require('./report.js')

async function main() {
    if (argv.length > 3) {
        console.log('more than 1 argument')
        process.exit(1)
    } 

    if (argv.length < 3) {
        console.log('less than 1 argument')
        process.exit(1)
    } 

    const baseURL = argv[2];

    const pages = await crawlPage(baseURL, baseURL, {})
    console.log('Final output')
    printReport(baseURL, pages)
}

main()