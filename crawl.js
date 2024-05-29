function normalizeURL(urlString) {
    const urlObject = new URL(urlString)

    const hostname = urlObject.hostname
}

module.exports = {
    normalizeURL
}