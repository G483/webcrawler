const { JSDOM } = require('jsdom')

function getURLsFromHTML(htmlString, baseURL) {
    const html = new JSDOM(htmlString)
    const urls = []
    html.window.document.querySelectorAll('a').forEach((element) => {
        const href = element.getAttribute('href')
        if (href && href.startsWith('/')) {
            try {
                const url = new URL(`${baseURL}${href}`)
                urls.push(url.toString())
            } catch (e) {
                console.log(`Invalid URL: ${href}`)
            } 
        } else {
            try {
                const url = new URL(href)
                urls.push(url.toString())
            } catch (e) {
                console.log(`Invalid URL: ${href}`) 
            }
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

async function crawlPage(baseURL) {
    let response
    try {
        response = await fetch(baseURL)
    } catch (err) {
        console.log(`Error fetching page: ${err.message}`)
    }

    if (response.status > 399) {
        throw new Error(`Failed to fetch page: ${response.statusText}`)
    } 

    if (response?.headers.get('content-type') !== 'text/html; charset=utf-8') {
        throw new Error(`Page is not HTML: ${response.headers.get('content-type')}`)
    }
        
    const html = await response.text()

    return html;
}

module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage
}