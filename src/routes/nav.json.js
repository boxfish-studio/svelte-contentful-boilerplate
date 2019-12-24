import { ContentfulApi } from '~/lib/contentful/'

export async function get(req, res, next) {
    const api = new ContentfulApi()
    const fetchedLinks = await api.fetchNavLinks()

    if (fetchedLinks !== null) {
        res.writeHead(200, {
            'Content-Type': 'application/json'
        })
        res.end(JSON.stringify(fetchedLinks))
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
