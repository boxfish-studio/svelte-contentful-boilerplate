<script>
    export let props
    const { title, url } = props
</script>

<style>
    .btn {
        padding: 10px;
        background-color: gray;
        color: white;
        margin: 10px;
    }
</style>

<a class="btn" href={url}>{title}</a>
