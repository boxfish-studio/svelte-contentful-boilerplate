<script>
    export let props
    const { title, url } = props
</script>

<style>
    .btn {
        padding: 10px;
        color: white;
        margin: 10px;
    }
</style>

<a class="btn bg-black" href={url}>{title}</a>
