const { JSDOM } = require('jsdom')

async function crawlPage(baseURL, currentURL = baseURL, pages = {}) {
    let response
    const baseURLObj = new URL(baseURL)
    const currentURLObj = new URL(currentURL)

    if (baseURLObj.hostname !== currentURLObj.hostname) {
        return pages
    }

    const currentNormalizedURL = normalizeURL(currentURL)
    if (pages[currentNormalizedURL] > 0) {
       pages[currentNormalizedURL]++

       return pages
    } 
    
    pages[currentNormalizedURL] = 1

    try {
        console.log(`Fetching current url: ${currentURL}`)
        response = await fetch(currentURL)
        if (response.status > 399) {
            console.log(`The server responded with an error: ${response.statusText}`)
            return pages
        } 

        if (response?.headers.get('content-type') !== 'text/html; charset=utf-8') {
            console.log(`Page is not HTML: ${response.headers.get('content-type')}`)
            return pages
        }

        const html = await response.text()
        const URLsToCrawl = getURLsFromHTML(html, currentURL)

        for (const url of URLsToCrawl) {
            pages = await crawlPage(baseURL, url, pages)
        }
    } catch (err) {
        console.log(`Error fetching page: ${err.message}`)
    }

    return pages
}

function getURLsFromHTML(htmlString, baseURL) {
    const html = new JSDOM(htmlString)
    const urls = []
    html.window.document.querySelectorAll('a').forEach((element) => {
        const href = element.getAttribute('href')
        if (href && href.startsWith('/')) {
            try {
                const url = new URL(href, baseURL)
                urls.push(url.toString())
                return
            } catch (e) {
                console.log(`Invalid URL: ${href} - Error: ${err.message}`) 
                return
            } 
        } 

        try {
            const url = new URL(href)
            urls.push(url.toString())
        } catch (err) {
            console.log(`Invalid URL: ${href} - Error: ${err.message}`) 
        }
    })

    return urls
}

function normalizeURL(urlString) {
    const urlObject = new URL(urlString)
    const hostPath = `${urlObject.hostname}${urlObject.pathname}`

    if (hostPath.length > 0 && hostPath.endsWith('/')) {
        return hostPath.slice(0, -1)
    }

    return hostPath
}

module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage
}