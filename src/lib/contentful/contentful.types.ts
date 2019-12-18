export type Test = {
    id: string
    title: string
}

export type Page = {
    id: string
    title: string
    slug: string
    components: Array<Component>
}

export type Component = {
    id: string
    type: string
    fields: Array<any>
}
