<script>
	import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
	import Button from './Button'
    import SecondaryButton from './SecondaryButton'
    
    export let componentType;
    export let props

    let COMPONENT_LIST = [
		{ id: 'button',   component: Button   },
		{ id: 'secondaryButton', component: SecondaryButton },
	];    
    
    const selectedComponent = COMPONENT_LIST.filter(item => item.id === componentType)[0]
</script>

{#if selectedComponent && selectedComponent.component}
<svelte:component this={selectedComponent.component} {props}/>
{/if}
