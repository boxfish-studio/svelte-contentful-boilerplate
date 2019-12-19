<script context="module">
    export async function preload({ params, query }) {
        // the `slug` parameter is available because
        // this file is called [slug].svelte
        const res = await this.fetch(`/${params.slug}.json`)
        const data = await res.json()

        if (res.status === 200) {
            return { page: data }
        } else {
            this.error(res.status, data.message)
        }
    }
</script>

<script>
    import ComponentSwitch from './../components/ComponentSwitch'

    export let page
</script>

<style type="text/scss">
    $color: gray;

    h1 {
        color: $color;
    }

    div {
        background: lightgray;
    }
</style>

<svelte:head>
    <title>{page.title}</title>
</svelte:head>

<h1>{page.title}</h1>

<div class="content">

    {#each page.components as component}
        <ComponentSwitch {component} />
    {/each}
</div>
