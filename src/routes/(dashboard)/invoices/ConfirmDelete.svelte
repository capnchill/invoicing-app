<script lang="ts">
	import { centsToDollars, sumLineItems } from '$lib/utils/moneyHelper';
	import Modal from '$lib/components/Modal.svelte';
	import Button from '$lib/components/Button.svelte';
	import { deleteInvoice } from '$lib/stores/InvoiceStore';
	import { createEventDispatcher } from 'svelte';

	export let invoice: Invoice;
	export let isModalShowing = false;

	async function handleDelete() {
		await deleteInvoice(invoice);
		dispatch('close');
	}

	let dispatch = createEventDispatcher();
</script>

<Modal isVisible={isModalShowing} on:close={() => (isModalShowing = false)} on:close>
	<div class="flex h-full min-h-[175px] flex-col items-center justify-between gap-6">
		<div class="text-center text-xl font-bold text-daisyBush">
			Are you sure you want to delete this invoice to
			<span class="text-scarlet">{invoice.client.name}</span> for
			<span class="text-scarlet">${centsToDollars(sumLineItems(invoice.lineItems))}</span>
			?
		</div>
		<div class="flex gap-4">
			<Button
				label="Cancel"
				onClick={() => dispatch('close')}
				isAnimated={false}
				style="secondary"
			/>
			<Button
				label="Yes, Delete it"
				onClick={handleDelete}
				isAnimated={false}
				style="destructive"
			/>
		</div>
	</div>
</Modal>
