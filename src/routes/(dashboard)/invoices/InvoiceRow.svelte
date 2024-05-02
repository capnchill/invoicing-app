<script lang="ts">
	import View from '$lib/components/Icon/View.svelte';
	import ThreeDots from '$lib/components/Icon/ThreeDots.svelte';
	import Tag from '$lib/components/Tag.svelte';

	export let invoice: Invoice;
</script>

<div
	class="invoice-table invoice-row items-center rounded-lg bg-white py-3 shadow-tableRow lg:py-6"
>
	<div class="status"><Tag className="ml:auto lg:ml-0" label={invoice.invoiceStatus} /></div>
	<div class="dueDate text-sm lg:text-lg">{invoice.dueDate}</div>
	<div class="invoiceNumber text-sm lg:text-lg">{invoice.invoiceNumber}</div>
	<div class="clientName text-base font-bold lg:text-xl">{invoice.client.name}</div>
	<div class="amount text-right font-mono text-sm font-bold lg:text-lg">
		${invoice.lineItems?.reduce((sum, item) => sum + item.amount, 0)}
	</div>
	<div class="center viewButton text-sm lg:text-lg">
		<a href="#" class="hidden text-pastelPurple hover:bg-daisyBush lg:block"><View /></a>
	</div>
	<div class="center moreButton text-sm lg:text-lg">
		<button class="hidden text-pastelPurple hover:text-daisyBush lg:block"><ThreeDots /></button>
	</div>
</div>

<style lang="postcss">
	.table-header h3 {
		@apply text-xl font-black leading-snug;
	}

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
