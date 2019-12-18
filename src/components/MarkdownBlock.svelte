<script>
    const marked = require('marked')

    export let props
    const { markdownText } = props

    // markdown parser configuration
    marked.setOptions({
        headerIds: false
    })
</script>

<style>

</style>

{@html marked(markdownText)}
