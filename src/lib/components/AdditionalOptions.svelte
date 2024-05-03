<script lang="ts">
	import type { SvelteComponent } from 'svelte';

	export let options: {
		label: string;
		// a constructor function that can accept any number of arguments and return a sveltecomponent
		icon?: new (...args: any[]) => SvelteComponent;
		onClick: () => void;
		disabled: boolean;
	}[];
</script>

<ul class="absolute left-0 top-4 rounded-lg bg-white shadow-lg">
	{#each options as option}
		{#if !option.disabled}
			<li>
				<button
					class="center flex w-full gap-x-2 p-4 font-sansSerif font-bold text-pastelPurple hover:text-daisyBush"
					on:click={option.onClick}
				>
					{#if option.icon}
						<!-- svelte component heps render components dynamically, this={component}, component here is the actual component that is being sent -->
						<svelte:component this={option.icon} />
					{/if}
					{option.label}
				</button>
			</li>
		{/if}
	{/each}
</ul>

<style lang="ts">
	li {
		@apply border-b-2 border-whisper;
	}

	li:last-child {
		@apply border-b-0;
	}
</style>
