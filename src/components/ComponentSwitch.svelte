<script>
    import Button from './Button'
    import SecondaryButton from './SecondaryButton'
    import TextBlock from './TextBlock'

    export let componentType
    export let props

    let COMPONENT_LIST = [
        { id: 'button', component: Button },
        { id: 'secondaryButton', component: SecondaryButton },
        { id: 'textBlock', component: TextBlock }
    ]

    const selectedComponent = COMPONENT_LIST.filter((item) => item.id === componentType)[0]
</script>

{#if selectedComponent && selectedComponent.component}
    <svelte:component this={selectedComponent.component} {props} />
{/if}
