# Svelte-Sapper-Contentful-Tailwind-Webpack Boilerplate

Boilerplate based on the default [Sapper] template. It allows setting up and kick-off your web project development within minutes. The boilerplate gathers:

* Svelte
* [Contentful] as Content Management System.
* `scss` syntax and [Tailwindcss] for styling.
* Webpack
* Deployment in [Now]

## Getting started

### Get the code

Clone the project and dive in. 

```bash
git clone git@github.com:boxfish-studio/svelte-contentful-boilerplate.git
cd svelte-contentful-boilerplate
```

### Connect to Contentful

Create [Contentful] environment file based on the given template

```bash
cp .env.example .env
```

Fill in the blank variables with your own [Contentful] space parameters 
```
CONTENTFUL_SPACE=your_space_id
CONTENTFUL_ACCESS_TOKEN=your_space_delivery_token
CONTENTFUL_STAGING_TOKEN=your_space_preview_token
```

### Run

Install dependancies and run:

```bash
yarn
yarn dev
```

The site should be available at [localhost:3000](http://localhost:3000).

## Deployment

The project deploys with [Now] by default. There will be necessary to add the environment variables before using the scripts for deployment.

### Environment Variables in [Now]

First of all, you need to [install now](https://zeit.co/docs#install-now-cli) and login with your account. Once it is done, you can [define the environment variables](https://zeit.co/docs/v2/environment-variables-and-secrets/?query=environment#defining-environment-variables) in `now`.

The needed secrets names can be found in `now.json`:

```json
{
    "env": {
        "CONTENTFUL_SPACE": "@contentful_space",
        "CONTENTFUL_ACCESS_TOKEN": "@contentful_access_token",
        "CONTENTFUL_STAGING_TOKEN": "@contentful_staging_token"
    }
}
```

### `Npm` scripts for deployment

Once the environment variables are defined in `now` you can execute the scripts for deployment.

There are two `npm` scripts for deployment, one for production (`npm run deploy-production`) and another one for "draft" mode (`npm run deploy-draft`)``

## Contentful and Svelte

The goal of using Svelte with [Contentful] is to be able to easily manage content and components. Therefore, there must be certain relation between [Contentful] models and Svelte components (i.e.: a component called `Button` could be associated to the model `Button` in Contentful).

On the other hand, a page from [Contentful] will be composed as:

```typescript
// contentful.types.ts

export type Page = {
    id: string
    title: string
    slug: string
    components: Array<Component>
}
```

Where `components` defines all components to be injected into the rendered `src/routes/[slug].svelte` file.

## Structure and Usage

On top of the standard [Sapper template], [Contentful] and [tailwindcss] have been added.

### `src/lib/contentful`

This folder hosts the necessary files for the integration with `Contentful`.

#### `contentful.ts`

In this file, there is a class that contains the configuration for `Contentful` client and some functions to retrieve data from the contentful API. some environment variables can be found in the `constructor` of this class. These variables are necessary to connect your app with your contentful space. In order to do that, these variables are initialized in a `.env` file that you can copy from `.env.example` in the root folder. The API keys can be found in the contentful space settings.

#### `contentful.types.ts`

In this file, you can find some types that will be used along with contentful models in the fetch functions of `src/lib/contentful/contentful.ts`.

### src/routes/[slug].json.js & src/routes/[slug].svelte

These two files are used to retrieve the pages (content_type: 'page') from contentful API.

The file `src/routes/[slug].json.js` uses the created `ContentfulApi` class to fetch the page content from `Contentful` depending on the `slug` introduced in any `/:slug` route.

After fetching the data, the file `src/routes/[slug].svelte` renders the page content based on that data by importing a component called `ComponentSwitch` which will be the responsible for detecting the data type of `page.components` and rendering each component in the correct way.

```js
// ComponentSwitch.svelte

{#each page.components as componentData (componentData.id)}
    <ComponentSwitch {componentData} />
{/each}
```

### `src/components/ComponentSwitch.svelte`

This component renders each "component" of `page.components` based on the `type` property of each one:

```typescript
// contentful.types.ts

export type Component = {
    id: string
    type: string // based on this property (e.g.: 'button')
    fields: Array<any>
}
```

To do that, this component should have an array of objects which represent the relationship between a Contentful Model and a Svelte Component. The `id` property represents the Contentful Model type and the `component` property represents the Svelte Component itself (notice that each component has to be imported to this file).

```js
// ComponentSwitch.svelte

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

`npm` scripts has been used to achieve this integration. You can check `package.json` file to see all the existing scripts.

The script used to run the app in development mode is `dev-draft` which throught other `npm` scripts compiles all `static/styles.scss` styles to a final file `static/styles.css` and runs the app in "draft" mode to be able of fetching "draft" content from Contentful, which is the best aproach for development purposes. If you need to find out more information about how these `npm` scripts work, this [css-tricks article](https://css-tricks.com/why-npm-scripts/) has been used as main reference.

### Integration for `Svelte` components

This integration has been done following this tutorial: https://dev.to/sarioglu/using-svelte-with-tailwindcss-a-better-approach-47ph but with some differences due to that this tutorial is just for Svelte (without Sapper). The only difference is in the section "3-Make the integration", where there only has been created "postcss.config.js" (removing purgecss from it) and instead of changing "rollup.config.js" (which doesn't exists in Sapper), there has been modified the file "svelte.config.js":

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

Notice that to use `scss` in components it is necessary write the `style` tag with `type="text/scss"`:

```html
<!-- SomeComponent.svelte -->

<style type="text/scss">
    /* scss and tailwind styling here... */
</style>
```

## Authors

[Boxfish Studio].


[Boxfish Studio]: http://boxfish.studio
[Contentful]: https://www.contentful.com/
[Sapper]: https://github.com/sveltejs/sapper
[Sapper template]: https://github.com/sveltejs/sapper-template
[Tailwindcss]: https://tailwindcss.com/
[Now]: https://github.com/zeit/now
