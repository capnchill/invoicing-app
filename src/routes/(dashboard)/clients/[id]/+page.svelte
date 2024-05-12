<script lang="ts">
	import { loadInvoices } from '$lib/stores/InvoiceStore';
	import { onMount } from 'svelte';

	import InvoiceRow from '../../invoices/InvoiceRow.svelte';
	import InvoiceRowHeader from '../../invoices/InvoiceRowHeader.svelte';
	import { centsToDollars, sumInvoices } from '$lib/utils/moneyHelper';
	import BlankState from '../../invoices/BlankState.svelte';
	import ClientForm from '../ClientForm.svelte';

	import Search from '$lib/components/Search.svelte';
	import CircledAmount from '$lib/components/CircledAmount.svelte';
	import SlidePanel from '$lib/components/SlidePanel.svelte';
	import Button from '$lib/components/Button.svelte';
	import Edit from '$lib/components/Icon/Edit.svelte';

	let isClientFormShowing = false;
	let isEditingCurrentClient = false;
	export let data;

	function editClient() {
		isClientFormShowing = true;
		isEditingCurrentClient = true;
	}

	function closePanel() {
		isClientFormShowing = false;
	}

	onMount(() => {
		loadInvoices();
		console.log(data.client?.invoices);
	});
</script>

<svelte:head>
	<title>Invoices</title>
</svelte:head>

<div
	class="mb-7 flex flex-col-reverse items-start justify-between gap-y-6 md:flex-row md:items-center md:gap-y-4 lg:mb-16"
>
	<!-- Search Field -->
	{#if data.client?.invoices && data.client?.invoices.length > 0}
		<Search />
	{:else}
		<div></div>
	{/if}

	<!-- new invoice button -->
	<div>
		<Button label="+ Client" onClick={() => (isClientFormShowing = true)} isAnimated={true} />
	</div>
</div>

<div class="mb-7 flex w-full items-center justify-between">
	<h1 class="font-sansSerif text-3xl font-bold text-daisyBush">{data.client?.name}</h1>
	<Button label="Edit" isAnimated={false} style="textOnly" iconLeft={Edit} onClick={editClient} />
</div>

<div class="mb-10 grid grid-cols-1 gap-4 rounded-lg bg-gallery px-10 py-7 lg:grid-cols-4">
	<div class="summary-block">
		<div class="label">Total Overdue</div>
		<div class="number"><sup>$</sup>300.00</div>
	</div>

	<div class="summary-block">
		<div class="label">Total Outstanding</div>
		<div class="number"><sup>$</sup>300.00</div>
	</div>

	<div class="summary-block">
		<div class="label">Total Draft</div>
		<div class="number"><sup>$</sup>300.00</div>
	</div>

	<div class="summary-block">
		<div class="label">Total Paid</div>
		<div class="number"><sup>$</sup>300.00</div>
	</div>
</div>

<div>
	{#if data.client?.invoices === null}
		Loading ...
	{:else if data.client?.invoices.length === 0}
		<!-- blank state, when $invoice.length is 0, render the BlankState Component -->
		<BlankState />
	{:else}
		<!-- header -->
		<InvoiceRowHeader className="text-daisyBush" />

		<!-- invoices -->
		<!-- flex-col-reverse is done so that the stacking order logic is maintained -->
		<div class="flex flex-col-reverse">
			{#each data.client?.invoices as invoice}
				<InvoiceRow {invoice} />
			{/each}
		</div>
		<CircledAmount amount={centsToDollars(sumInvoices(data.client?.invoices))} label="Total" />
	{/if}
</div>

<!-- Slide panel -->
{#if isClientFormShowing}
	<SlidePanel on:closePanel={closePanel}>
		<ClientForm
			{closePanel}
			formStatus={isEditingCurrentClient ? 'edit' : 'create'}
			client={isEditingCurrentClient ? data.client : undefined}
		/>
	</SlidePanel>
{/if}

<style lang="postcss">
	.summary-block {
		@apply text-center;
	}

	.label {
		@apply text-sm font-black text-[#A397AD];
	}

	sup {
		@apply relative -top-2;
	}

	.number {
		@apply truncate text-[2.5rem] font-black text-purple;
	}
</style>
