<script>
    import Button from './Button'
    import SecondaryButton from './SecondaryButton'
    import RichTextBlock from './RichTextBlock'
    import MarkdownBlock from './MarkdownBlock'

    export let component

    let COMPONENT_LIST = [
        { id: 'button', componentName: Button },
        { id: 'secondaryButton', componentName: SecondaryButton },
        { id: 'richTextBlock', componentName: RichTextBlock },
        { id: 'markdownBlock', componentName: MarkdownBlock }
    ]

    const selectedComponent = COMPONENT_LIST.filter((item) => item.id === component.type)[0]
    // console.log(selectedComponent.componentName)
</script>

{#if selectedComponent && selectedComponent.componentName}
    <svelte:component this={selectedComponent.componentName} props={component.fields} />
{/if}
