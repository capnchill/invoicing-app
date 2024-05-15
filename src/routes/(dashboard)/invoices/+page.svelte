<script lang="ts">
	import InvoiceRowHeader from './InvoiceRowHeader.svelte';

	import { invoices, loadInvoices } from '$lib/stores/InvoiceStore';

	import InvoiceRow from './InvoiceRow.svelte';
	import Search from '$lib/components/Search.svelte';
	import CircledAmount from '$lib/components/CircledAmount.svelte';
	import Button from '$lib/components/Button.svelte';
	import { onMount } from 'svelte';
	import { centsToDollars, sumInvoices } from '$lib/utils/moneyHelper';
	import BlankState from './BlankState.svelte';
	import SlidePanel from '$lib/components/SlidePanel.svelte';
	import InvoiceForm from './InvoiceForm.svelte';

	let isInvoiceShowing = false;

	onMount(async () => {
		await loadInvoices();
	});
</script>

<svelte:head>
	<title>Invoices</title>
</svelte:head>

<div
	class="mb-7 flex flex-col-reverse items-start justify-between gap-y-6 md:flex-row md:items-center md:gap-y-4 lg:mb-16"
>
	<!-- Search Field -->
	{#if $invoices.length > 0}
		<Search />
	{:else}
		<div></div>
	{/if}

	<!-- new invoice button -->
	<div>
		<Button label="+ Invoice" onClick={() => (isInvoiceShowing = true)} isAnimated={true} />
	</div>
</div>

<!-- blank state, when $invoice.length is 0, render the BlankState Component -->

<div>
	{#if $invoices === null}
		Loading ...
	{:else if $invoices.length === 0}
		<BlankState />
	{:else}
		<!-- header -->
		<InvoiceRowHeader className="text-daisyBush" />

		<!-- invoices -->
		<!-- flex-col-reverse is done so that the stacking order logic is maintained -->
		<div class="flex flex-col-reverse">
			{#each $invoices as invoice}
				<InvoiceRow {invoice} />
			{/each}
		</div>
		<CircledAmount amount={centsToDollars(sumInvoices($invoices))} label="Total" />
	{/if}
</div>

<!-- Slide panel -->
{#if isInvoiceShowing}
	<SlidePanel on:closePanel={() => (isInvoiceShowing = false)}
		><InvoiceForm closePanel={() => (isInvoiceShowing = false)} /></SlidePanel
	>
{/if}
