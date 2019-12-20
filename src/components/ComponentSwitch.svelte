<script>
    import Button from './Button'
    import SecondaryButton from './SecondaryButton'
    import RichTextBlock from './RichTextBlock'
    import MarkdownBlock from './MarkdownBlock'

    export let component
    // console.log(component)

    let COMPONENT_LIST = [
        { id: 'button', componentData: Button },
        { id: 'secondaryButton', componentData: SecondaryButton },
        { id: 'richTextBlock', componentData: RichTextBlock },
        { id: 'markdownBlock', componentData: MarkdownBlock }
    ]

    const selectedComponent = COMPONENT_LIST.filter((item) => item.id === component.type)[0]
    // console.log(selectedComponent.componentData)
</script>

{#if selectedComponent && selectedComponent.componentData}
    <svelte:component this={selectedComponent.componentData} props={component.fields} />
{/if}
