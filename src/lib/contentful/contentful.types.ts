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

export type NavLink = {
    id: string
    title: string
    slug: string
}
