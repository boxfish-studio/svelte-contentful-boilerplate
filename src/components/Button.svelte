<script>
    export let props
    const { title, url } = props
</script>

<style>
    .btn {
        padding: 10px;
        background-color: purple;
        color: white;
        margin: 10px;
    }
</style>

<a class="btn" href={url}>{title}</a>
