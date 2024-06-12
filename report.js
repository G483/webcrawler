function printReport(baseURL, pages) {
    console.log(`Report for ${baseURL} is starting`)
    
    let pagesArray = Object.entries(pages)
    const sortedPages = pagesArray.sort((a, b) => b[1] - a[1])
    
    for (const [url, count] of sortedPages) {
        console.log(`Found ${count} internal links to ${url}`)
    }
}

module.exports = {
    printReport
}