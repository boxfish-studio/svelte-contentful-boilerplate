<script context="module">
    export async function preload(query) {
        const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https'
        const res = await this.fetch(`${protocol}://${query.host}/test.json`)
        const fetchedTests = await res.json()
        if (res.status === 200) {
            return { fetchedTests }
        } else {
            this.error(res.status, fetchedTests.message)
        }
    }
</script>

<script>
    export let fetchedTests        
</script>

<style>

</style>

<svelte:head>
    <title>Testing Contenful</title>
</svelte:head>

{#if fetchedTests}
    <ul>
        {#each fetchedTests as test}
            <h1>{test.title}</h1>
        {/each}
    </ul>
{/if}
