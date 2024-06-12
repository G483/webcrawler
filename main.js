const { argv } = require('node:process');
const {crawlPage} = require('./crawl')

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
    for (const page of Object.entries(pages)) {
        console.log(page)
    }
}

main()