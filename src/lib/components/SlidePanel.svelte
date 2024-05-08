<script lang="ts">
	import Overlay from './Overlay.svelte';
	import Portal from './Portal.svelte';
	import Arrow from './Icon/Arrow.svelte';
	import { createEventDispatcher } from 'svelte';

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
		class="fixed right-0 top-0 z-slidePanel h-full w-full overflow-y-scroll bg-white px-5 pt-16 shadow-slidePanel lg:w-3/4 lg:px-32
		lg:py-20"
	>
		<div class="absolute left-7 top-5 text-pastelPurple hover:text-daisyBush">
			<button on:click={() => dispatch('closePanel')}>
				<Arrow />
			</button>
		</div>
		<slot></slot>
	</div>
</Portal>
