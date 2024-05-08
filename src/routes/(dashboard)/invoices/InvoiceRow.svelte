<script lang="ts">
	import ConfirmDelete from './ConfirmDelete.svelte';
	import View from '$lib/components/Icon/View.svelte';
	import ThreeDots from '$lib/components/Icon/ThreeDots.svelte';
	import Tag from '$lib/components/Tag.svelte';
	import { centsToDollars, invoiceTotal, sumLineItems } from '$lib/utils/moneyHelper';
	import { convertDate, isLate } from '$lib/utils/datesHelpers';
	import AdditionalOptions from '$lib/components/AdditionalOptions.svelte';
	import Send from '$lib/components/Icon/Send.svelte';
	import Edit from '$lib/components/Icon/Edit.svelte';
	import Trash from '$lib/components/Icon/Trash.svelte';
	import SlidePanel from '$lib/components/SlidePanel.svelte';
	import InvoiceForm from './InvoiceForm.svelte';

	export let invoice: Invoice;
	let isAdditionalMenuShowing = false;
	let isOptionsDisabled = false;
	let isModalShowing = false;
	let isInvoiceShowing = false;

	function handleDelete() {
		console.log('deleting invoice');
		isModalShowing = true;
		isAdditionalMenuShowing = false;
	}

	function handleEdit() {
		isInvoiceShowing = true;
		isAdditionalMenuShowing = false;
	}

	function handleSendInvoice() {
		console.log('sending invoice');
	}

	function getInvoiceLabel() {
		if (invoice.invoiceStatus === 'Draft') {
			return 'draft';
		} else if (invoice.invoiceStatus === 'sent' && !isLate(invoice.dueDate)) {
			isOptionsDisabled = true;
			return 'sent';
		} else if (invoice.invoiceStatus === 'sent' && isLate(invoice.dueDate)) {
			isOptionsDisabled = true;
			return 'late';
		} else if (invoice.invoiceStatus === 'paid') {
			isOptionsDisabled = true;
			return 'paid';
		}
	}
</script>

<div
	class="invoice-table invoice-row items-center rounded-lg bg-white py-3 shadow-tableRow lg:py-6"
>
	<div class="status">
		<Tag className="lg:ml-0 ml-auto" label={getInvoiceLabel()} />
	</div>
	<div class="dueDate text-sm lg:text-lg">{convertDate(invoice.dueDate)}</div>
	<div class="invoiceNumber text-sm lg:text-lg">{invoice.invoiceNumber}</div>
	<div class="clientName truncate whitespace-nowrap text-base font-bold lg:text-xl">
		{invoice.client.name}
	</div>
	<div class="amount text-right font-mono text-sm font-bold lg:text-lg">
		${centsToDollars(invoiceTotal(invoice.lineItems, invoice.discount))}
	</div>
	<div class="center viewButton text-sm lg:flex lg:text-lg">
		<a href="#" class="hidden text-pastelPurple hover:bg-daisyBush lg:block"><View /></a>
	</div>
	<div class="center moreButton relative text-sm lg:flex lg:text-lg">
		<button
			class="hidden text-pastelPurple hover:text-daisyBush lg:block"
			on:click={() => (isAdditionalMenuShowing = !isAdditionalMenuShowing)}><ThreeDots /></button
		>
		{#if isAdditionalMenuShowing}
			<AdditionalOptions
				options={[
					{ label: 'Edit', icon: Edit, onClick: handleEdit, disabled: isOptionsDisabled },
					{ label: 'Delete', icon: Trash, onClick: handleDelete, disabled: false },
					{ label: 'Send', icon: Send, onClick: handleSendInvoice, disabled: isOptionsDisabled }
				]}
			/>
		{/if}
	</div>
</div>

<ConfirmDelete {invoice} {isModalShowing} on:close={() => (isModalShowing = false)} />

{#if isInvoiceShowing}
	<SlidePanel on:closePanel={() => (isInvoiceShowing = false)}
		><InvoiceForm
			formState="edit"
			{invoice}
			closePanel={() => (isInvoiceShowing = false)}
		/></SlidePanel
	>
{/if}

<style lang="postcss">
	.invoice-row {
		grid-template-areas:
			'invoiceNumber invoiceNumber'
			'clientName amount'
			'dueDate status';
	}

	@media (min-width: 1024px) {
		.invoice-row {
			grid-template-areas: 'status dueDate invoiceNumber clientName amount viewButton moreButton';
		}
	}

	.invoice-row .status {
		grid-area: status;
	}

	.invoice-row .dueDate {
		grid-area: dueDate;
	}

	.invoice-row .invoiceNumber {
		grid-area: invoiceNumber;
	}

	.invoice-row .clientName {
		grid-area: clientName;
	}

	.invoice-row .amount {
		grid-area: amount;
	}

	.invoice-row .viewButton {
		grid-area: viewButton;
	}

	.invoice-row .moreButton {
		grid-area: moreButton;
	}
</style>
