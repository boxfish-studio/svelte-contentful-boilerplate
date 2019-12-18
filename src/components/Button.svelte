<script>
    export let props
    const { title, url } = props
</script>

<style>
    .btn {
        padding: 10px;
        margin: 10px;
    }
</style>

<a class="btn bg-green-500 text-white font-bold" href={url}>{title}</a>
