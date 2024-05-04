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

	<div class="shadow-slidePanel fixed right-0 top-0 z-slidePanel h-full w-3/4 bg-white px-32 py-20">
		<div class="absolute left-7 top-5 text-pastelPurple hover:text-daisyBush">
			<button on:click={() => dispatch('closePanel')}>
				<Arrow />
			</button>
		</div>
		<slot></slot>
	</div>
</Portal>
