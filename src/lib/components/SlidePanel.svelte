<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { fly } from 'svelte/transition';
	import { clickOutside } from '$lib/actions/ClickOutside';

	import Overlay from './Overlay.svelte';
	import Portal from './Portal.svelte';
	import Arrow from './Icon/Arrow.svelte';

	let dispatch = createEventDispatcher();
</script>

<svelte:window
	on:keydown={(event) => {
		if (event.key === 'Escape') {
			dispatch('closePanel');
		}
	}}
/>

<Portal>
	<!-- Overlay will hide all the content in the page -->
	<Overlay />

	<div
		class="fixed right-0 top-0 z-slidePanel h-full w-full overflow-y-scroll bg-white px-12 pt-16 shadow-slidePanel lg:w-3/4 lg:px-32
		lg:py-20"
		transition:fly={{ x: 1000, duration: 500 }}
		use:clickOutside={() => dispatch('closePanel')}
	>
		<div class="absolute left-7 top-5 text-pastelPurple hover:text-daisyBush">
			<button on:click={() => dispatch('closePanel')}>
				<Arrow />
			</button>
		</div>
		<slot></slot>
	</div>
</Portal>
