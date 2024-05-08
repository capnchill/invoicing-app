<script lang="ts">
	import Trash from '$lib/components/Icon/Trash.svelte';
	import { twoDecimals, dollarsToCents, centsToDollars } from '$lib/utils/moneyHelper';
	import { createEventDispatcher } from 'svelte';

	export let LineItem: LineItem;
	export let canDelete: boolean = false;
	export let isRequired: boolean = false;

	let dispatch = createEventDispatcher();

	let unitPrice = centsToDollars(LineItem.amount / LineItem.quantity);
	let amount = twoDecimals(LineItem.amount);

	// the reactive block is the same as useEffect() hook in react
	$: {
		amount = twoDecimals(LineItem.quantity * Number(unitPrice));
		LineItem.amount = dollarsToCents(Number(amount));
	}
</script>

<div class="invoice-line-item border-b-2 border-fog py-2">
	<div>
		<input
			class="line-item"
			type="text"
			name="descripition"
			bind:value={LineItem.description}
			required={isRequired}
		/>
	</div>

	<div>
		<input
			class="line-item text-right"
			type="number"
			name="unitPrice"
			step="0.01"
			min="0"
			bind:value={unitPrice}
			on:blur={() => {
				unitPrice = twoDecimals(Number(unitPrice));
				dispatch('updateLineItem');
			}}
			required={isRequired}
		/>
	</div>

	<div>
		<input
			class="line-item text-center"
			type="number"
			name="quantity"
			min="0"
			bind:value={LineItem.quantity}
			on:blur={() => {
				dispatch('updateLineItem');
			}}
			required={isRequired}
		/>
	</div>

	<div>
		<input
			class="line-item text-right"
			type="number"
			name="amount"
			step="0.01"
			min="0"
			bind:value={amount}
			disabled
			required={isRequired}
		/>
	</div>

	<div>
		{#if canDelete}
			<button
				class="center h-10 w-10 text-pastelPurple hover:text-lavenderIndigo"
				on:click|preventDefault={() => dispatch('removeLineItem', LineItem.id)}><Trash /></button
			>
		{/if}
	</div>
</div>

<style lang="postcss">
	input[type='text'],
	input[type='number'] {
		@apply h-10 w-full border-b-2 border-dashed border-stone-300;
	}

	input[type='text'] {
		@apply font-sansSerif text-xl font-bold;
	}

	input[type='number'] {
		@apply font-mono text-base;
	}

	input[type='text']:focus,
	input[type='number']:focus {
		@apply border-solid border-lavenderIndigo outline-none;
	}

	input[type='number']:disabled,
	input[type='text']:disabled {
		@apply border-b-0 bg-transparent px-0;
	}
</style>
