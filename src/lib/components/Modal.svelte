<script>
	import Overlay from './Overlay.svelte';
	import Portal from './Portal.svelte';
	import Cancel from '$lib/components/Icon/Cancel.svelte';
	import { createEventDispatcher } from 'svelte';

	export let isVisible = false;

	const dispatch = createEventDispatcher();
</script>

<!-- This is used to hide the modal when the keypress is detected in the window -->
<svelte:window
	on:keydown={(event) => {
		if (event.key === 'Escape') {
			dispatch('close');
		}
	}}
/>

{#if isVisible}
	<Portal>
		<Overlay />
		<div class="center fixed inset-0 z-modal">
			<div class="relative min-h-[230px] w-full max-w-[450px] rounded-lg bg-white px-10 py-7">
				<button
					class="absolute right-4 top-4 text-pastelPurple hover:bg-daisyBush"
					on:click={() => dispatch('close')}
				>
					<Cancel />
				</button>
				<slot></slot>
			</div>
		</div>
	</Portal>
{/if}
