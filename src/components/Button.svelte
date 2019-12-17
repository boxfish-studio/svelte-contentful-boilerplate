<script>
    export let props
    const { title, url } = props
</script>

<style>
    .btn {
        @apply bg-white;
        padding: 10px;
        color: green;
        margin: 10px;
    }

    a {
        @apply text-2xl;
    }
</style>

<a class="btn" href={url}>{title}</a>
