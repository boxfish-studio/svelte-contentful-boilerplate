<script context="module">
    export async function preload(page) {
        const res = await this.fetch(`nav.json`)
        const fetchedLinks = await res.json()

        if (res.status === 200) {
            return { navLinks: fetchedLinks }
        } else {
            this.error(res.status, data.message)
        }
    }
</script>

<script>
    import Nav from '../components/Nav.svelte'

    export let segment
    export let navLinks
</script>

<style>
    main {
        position: relative;
        max-width: 56em;
        background-color: white;
        padding: 2em;
        margin: 0 auto;
        box-sizing: border-box;
    }
</style>

<Nav {segment} {navLinks} />

<main>
    <slot />
</main>
