import { ContentfulClientApi, createClient } from 'contentful'
import { Page, Component, NavLink } from './contentful.types'

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

    async fetchNavLinks(): Promise<Array<NavLink>> {
        return await this.client
            .getEntries({
                content_type: 'page',
                'fields.appearInNavigation': true
            })
            .then((entries) => {
                if (entries && entries.items && entries.items.length > 0) {
                    const fetchedItems = entries.items.map((entry) => this.convertNavLink(entry))
                    return fetchedItems
                }
                return []
            })
            .catch((err) => {
                return []
            })
    }

    convertNavLink = (rawData: any): NavLink => {
        const rawProject = rawData.fields
        return {
            id: rawData.sys.id,
            title: rawProject.navBarTitle,
            slug: rawProject.slug
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
        const components =
            rawProject.components && rawProject.components.length > 0
                ? rawProject.components.map((comp) => this.convertComponent(comp))
                : []

        return {
            id: rawData.sys.id,
            title: rawProject.title,
            slug: rawProject.slug,
            components: components
        }
    }

    convertComponent = (rawData: any): Component => {
        const componentFields = rawData.fields
        const componentType = rawData.sys.contentType.sys.id

        return {
            id: rawData.sys.id,
            type: componentType,
            fields: componentFields
        }
    }
}
