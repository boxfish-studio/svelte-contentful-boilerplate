<script>
    import Button from './Button'
    import RichTextBlock from './RichTextBlock'
    import MarkdownBlock from './MarkdownBlock'

    export let componentData

    let COMPONENT_LIST = [
        { id: 'button', component: Button },
        { id: 'richTextBlock', component: RichTextBlock },
        { id: 'markdownBlock', component: MarkdownBlock }
    ]

    const selectedComponent = COMPONENT_LIST.filter((item) => item.id === componentData.type)[0]
</script>

{#if selectedComponent && selectedComponent.component}
    <svelte:component this={selectedComponent.component} props={componentData.fields} />
{/if}
