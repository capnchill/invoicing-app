<script lang="ts">
	import { snackbar } from '$lib/stores/SnackbarStore';
	import { fly, fade } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	// flip stands for first last invert and play, a way for svelte to figure out how animate between the values passed in
	import Cancel from './Icon/Cancel.svelte';
	import Portal from './Portal.svelte';
	import SnackbarMessage from './SnackbarMessage.svelte';
</script>

<Portal>
	<div class="fixed left-1/2 top-5 z-toaster -translate-x-1/2">
		{#each $snackbar as content (content.id)}
			<div
				in:fly={{ opacity: 0, y: -100 }}
				out:fade={{ duration: 300 }}
				animate:flip={{ duration: 300 }}
			>
				<div
					class="mb-2 inline-block rounded-lg px-5 py-4 text-lg font-bold"
					class:info={content.type === 'info'}
					class:warning={content.type === 'warning'}
					class:error={content.type === 'error'}
					class:success={content.type === 'success'}
				>
					<div class="flex gap-4">
						<SnackbarMessage message={content.message} />
						<button
							on:click={() => {
								snackbar.remove(content.id);
							}}
						>
							<Cancel />
						</button>
					</div>
				</div>
			</div>
		{/each}
	</div>
</Portal>

<style lang="postcss">
	.info {
		@apply bg-prim text-daisyBush;
	}

	.warning {
		@apply bg-goldenFizz text-scarlet;
	}

	.error {
		@apply bg-scarlet text-goldenFizz;
	}

	.success {
		@apply bg-robinEggBlue text-daisyBush;
	}
</style>
