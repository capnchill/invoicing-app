<script lang="ts">
	export let className: string = '';
</script>

<!-- overflow-hidden is added to body to prevent scroll only when the overlay component is rendered -->
<svelte:head>
	<style lang="postcss">
		body {
			@apply overflow-hidden;
		}
	</style>
</svelte:head>

<div class="fixed bottom-0 left-0 right-0 top-0 z-overlay {className} bg-blueGem opacity-60"></div>
