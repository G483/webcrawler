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

    const html = await crawlPage(argv[2])
    console.log(html)
}

main()