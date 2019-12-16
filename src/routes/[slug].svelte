<script context="module">
	export async function preload({ params, query }) {
		// the `slug` parameter is available because
        // this file is called [slug].svelte
		const res = await this.fetch(`/${params.slug}.json`);
		const data = await res.json();

		if (res.status === 200) {
			return { page: data };
		} else {
			this.error(res.status, data.message);
		}
	}

</script>

<script>
	import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
	import Button from './../components/Button'
	import SecondaryButton from './../components/SecondaryButton'
	import ComponentSwitch from './../components/ComponentSwitch'


	export let page
	console.log(page);
</script>

<svelte:head>
	<title>{page.title}</title>
</svelte:head>

<h1>{page.title}</h1>

<div class='content'>


	{#each page.components as comp}
		<ComponentSwitch componentType={comp.type} props={{title: 'algo', url: 'https://google.es'}}/>
		{#if comp.type === 'button'}
			<!-- <Button title={comp.field	s.title} url={comp.fields.url}/> -->
		{:else if comp.type === 'secondaryButton'}
			<!-- <SecondaryButton title={comp.fields.title} url={comp.fields.url}/> -->
		{:else if comp.type === 'textBlock'}
			<!-- <p>{@html documentToHtmlString(comp.fields.text)}</p> -->
		{/if}
	{/each}
</div>
