<script>
    import { documentToHtmlString } from '@contentful/rich-text-html-renderer'

    export let props
    const { text } = props
</script>

<style>

</style>

{@html documentToHtmlString(text)}
