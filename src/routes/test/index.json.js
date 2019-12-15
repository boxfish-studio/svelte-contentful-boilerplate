import { ContentfulApi } from '~/lib/contentful/'

export async function get(req, res, next) {
    const api = new ContentfulApi()
    const fetchedTests = await api.fetchTests()

    if (fetchedTests !== null) {
        res.writeHead(200, {
            'Content-Type': 'application/json'
        })
        res.end(JSON.stringify(fetchedTests))
    } else {
        res.writeHead(404, {
            'Content-Type': 'application/json'
        })
        res.end(
            JSON.stringify({
                message: `Not found`
            })
        )
    }
}
