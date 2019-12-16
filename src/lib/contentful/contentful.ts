import { ContentfulClientApi, createClient } from 'contentful'
import { Page, Test } from './contentful.types'

export class ContentfulApi {
    client: ContentfulClientApi

    constructor() {
        const draftMode = process.env.DRAFT_MODE
        this.client = createClient({
            space: process.env.CONTENTFUL_SPACE,
            accessToken: draftMode ? process.env.CONTENTFUL_STAGING_TOKEN : process.env.CONTENTFUL_ACCESS_TOKEN,
            host: draftMode ? 'preview.contentful.com' : null,
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

    async fetchPage(slug: string): Promise<Page> {
        return await this.client
            .getEntries({
                content_type: 'page',
                'fields.slug[in]': slug
            })
            .then((entry) => {
                if (entry && entry.items && entry.items.length > 0) {
                    return this.convertPage(entry.items[0])
                }
                return null
            })
    }

    convertPage = (rawData: any): Page => {
        const rawProject = rawData.fields
        const components = rawProject.components.map(comp => {
            return this.convertComponents(comp)
        })
        
        return {
            id: rawData.sys.id,
            title: rawProject.title,
            slug: rawProject.slug,
            components: components
        }
    }

    convertComponents = (rawData: any): any => {
        const componentFields = rawData.fields
        const componentType = rawData.sys.contentType.sys.id

        return {
            id: rawData.sys.id,
            type: componentType,
            fields: componentFields,
        }
    }
}
