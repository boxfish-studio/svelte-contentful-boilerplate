import { ContentfulApi } from '~/lib/contentful/'

export async function get(req, res, next) {
	const api = new ContentfulApi()
	const { slug } = req.params
	const fetchedPage = await api.fetchPage(slug)

	if (fetchedPage !== null) {
		res.writeHead(200, {
			'Content-Type': 'application/json'
		})
		res.end(JSON.stringify(fetchedPage))
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
