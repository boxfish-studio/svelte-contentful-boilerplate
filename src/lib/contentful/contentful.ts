import { ContentfulClientApi, createClient } from 'contentful'
import { Test } from './contentful.types'

export class ContentfulApi {
    client: ContentfulClientApi

    constructor() {
        const staging = process.env.STAGING
        this.client = createClient({
            space: process.env.CONTENTFUL_SPACE,
            accessToken: staging ? process.env.CONTENTFUL_STAGING_TOKEN : process.env.CONTENTFUL_ACCESS_TOKEN,
            host: staging ? 'preview.contentful.com' : null,
            resolveLinks: true
        })
    }

    async fetchTests(): Promise<Array<Test>> {
        return await this.client
            .getEntries({
                content_type: 'test'
            })
            .then((entries) => {
                if (entries && entries.items && entries.items.length > 0) {
                    const fetchedItems = entries.items.map((entry) => this.convertTest(entry))
                    return fetchedItems
                }
                return []
            })
    }

    convertTest = (rawData: any): Test => {
        const rawProject = rawData.fields
        return {
            id: rawData.sys.id,
            title: rawProject.title
        }
    }
}
