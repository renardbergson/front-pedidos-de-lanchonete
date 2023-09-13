async function fetchAPI (method, url, item, callback) {
    if (method === 'GET') {
        const response = await fetch(url)
        const data = await response.json()
        
        callback ? callback(data) : null
    }

    if (method === 'POST') {
        const response  = await fetch(url, {
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify(item)
        })
        const data = await response.json()

        callback ? callback(data.message) : null
    }
}

export {fetchAPI}