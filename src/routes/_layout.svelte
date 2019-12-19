<script>
    import Nav from '../components/Nav.svelte'
    import MyNav from '../components/MyNav'

    export let segment
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

<Nav {segment} />
<MyNav {segment} />

<main>
    <slot />
</main>
