# svelte-sapper-contentful

This is a boilerplate based on the default [Sapper](https://github.com/sveltejs/sapper) template, which also includes the CMS (Content Management System) [Contentful](https://www.contentful.com/).

Besides, this boilerplate gives you the possibility of using `scss` syntax and [tailwindcss](https://tailwindcss.com/) for styling.

## Getting started

### Using GitHub templates

// TODO:

Alternatively, you can use GitHub's template feature with the [sapper-template-rollup](https://github.com/sveltejs/sapper-template-rollup) or [sapper-template-webpack](https://github.com/sveltejs/sapper-template-webpack) repositories.

### Running the project

You can install dependencies and run the project in development mode with:

```bash
cd my-app
npm install # or yarn
npm run dev-draft-tailwind-w # watch for changes in static/styles.scss nad runs sapper in 'draft' mode
```

Open up [localhost:3000](http://localhost:3000) and start your project.

## Contentful and Svelte

The goal of using Contentful with Svelte is to be able of create pages with different content and components on each one of them.

For this reason, in this boilerplate there is some parallelism between Contentful models and Svelte components (i.e.: a `Button` component can be associated to a `Button` model in Contentful). In order to do that, when a page is fetched from contentfull, it will have this structure:

```typescript
export type Page = {
    id: string
    title: string
    slug: string
    components: Array<Component>
}
```

where `components` will be the array of components that will be rendered on each page throught the `src/routes/[slug].svelte` file.

## Structure

Appart from everything you can find on [Sapper](https://github.com/sveltejs/sapper-template) template, there are some new features like [Contentful](https://www.contentful.com/) integration and [tailwindcss](https://tailwindcss.com/).

### src/lib/contentful

In this directory, there are the necessary files to make the integration with `Contentful`.

#### src/lib/contentful/contentful.ts

In this file, there is a class that contains the configuration for `Contentful` client and some functions to retrieve data from the contentful API. You can find some environments variables in the `constructor` of this class. These variables are necessary to connect your app to your contentful account. In order to do that, these variables are initialized in a `.env` file that you can copy from `.env.example` in the root folder. The API keys can be found in the contentful's space settings.

#### src/lib/contentful/contentful.types.ts

In this file, you can find some types that will be used along with contentful models in the fetch functions of `src/lib/contentful/contentful.ts`, you can create as many types as you want in order to have your code more organized and clear.

#### src/routes/[slug].json.js & src/routes/[slug].svelte

These two files are used to retrieve the pages (content_type: 'page') from contentful API.

the file `src/routes/[slug].json.js` uses the created `ContentfulApi` class to fetch the page content from `Contentful` depending on the `slug` introduced in a `/:slug` route.

After fetching the data, the file `src/routes/[slug].svelte` renders the page content based on that data by importing a component called `ComponentSwitch` which will be the responsible for detecting the data type of `page.components` and rendering each component in the correct way.

```js
{#each page.components as componentData (componentData.id)}
    <ComponentSwitch {componentData} />
{/each}

```

#### src/components/ComponentSwitch.svelte

This component renders each "component" of `page.components` based on the `type` property of each one:

```typescript
export type Component = {
    id: string
    type: string
    fields: Array<any>
}
```

To do that, this component should have an array of objects which represent the relationship between a Contentful Model and a Svelte Component. The `id` property represents the Contentful Model type and the `component` property represents the Svelte Component itself (each component has to be imported to this file).

```js
let COMPONENT_LIST = [
    { id: 'button', component: Button },
    { id: 'richTextBlock', component: RichTextBlock },
    { id: 'markdownBlock', component: MarkdownBlock }
]
```

Finally, this component finds out which component should render and renders it whith its properties.

## Scss & Tailwindcss

This boilerplate uses both `tailwindcss` and `scss`.

To integrate them, there has been used two aproaches, one for general styles and another one for component based styles.

### Integration for general styles

`npm` scripts has been used to achieve this integration. You can check `package.json` file to see all the created scripts.

The script used to run the app in development mode is `dev-draft-tailwind-w` which throught other `npm` scripts compiles all `static/styles.scss` styles to a final file `static/styles.css` and runs the app in "draft" mode to be able of fetching "draft" content from Contentful, which seems the best aproach for development. If you need to find out more information about how these `npm` scripts work, this [css-tricks article](https://css-tricks.com/why-npm-scripts/) has been used as main reference.

### Integration for `Svelte` components

This integration has been done following this tutorial: https://dev.to/sarioglu/using-svelte-with-tailwindcss-a-better-approach-47ph but with some differences due to that this tutorial is just for Svelte, without Sapper. The only difference is in the section "3-Make the integration", where there only has been created "postcss.config.js" (removing purgecss from it) and instead of changing "rollup.config.js" (which doesn't exists in Sapper), there has been modified the file "svelte.config.js":

```js
// svelte.config.js
const sveltePreprocess = require('svelte-preprocess')

module.exports.preprocess = sveltePreprocess({
    postcss: {
        plugins: [require('tailwindcss'), require('autoprefixer')]
    },
    scss: true
})
```

To use `scss` in components it is necessary write the `style` tag with
`type="text/scss"`:

```html
<!-- SomeComponent.svelte -->
<style type="text/scss">
    /* scss and tailwind styling... */
</style>
```
