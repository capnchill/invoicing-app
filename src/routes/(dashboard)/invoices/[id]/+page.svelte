<script lang="ts">
	import { loadSettings, settings } from '$lib/stores/Settings';

	import Button from '$lib/components/Button.svelte';
	import { convertDate } from '$lib/utils/datesHelpers.js';
	import LineItemRows from '../LineItemRows.svelte';
	import { onMount } from 'svelte';

	export let data: { invoice: Invoice };

	function printInvoice() {
		console.log('printing invoice');
	}

	function copyLink() {
		console.log('copy link');
	}

	function payInvoice() {
		console.log('pay invoice');
	}

	function sendInvoice() {
		console.log('send invoice');
	}

	onMount(() => {
		loadSettings();
	});
</script>

<div class="fixed z-0 mb-16 flex w-full max-w-screen-lg justify-between">
	<h1 class="text-3xl font-bold text-daisyBush">Invoice</h1>
	<div class="flex items-center gap-4">
		<Button
			label="Print"
			style="outline"
			onClick={printInvoice}
			isAnimated={false}
			height="short"
		/>
		<Button label="Copy Link" style="primary" onClick={copyLink} height="short" />
		<Button label="Pay Invoice" style="primary" onClick={payInvoice} height="short" />
		<Button label="Send Invoice" style="primary" onClick={sendInvoice} height="short" />
	</div>
</div>

<div
	class="relative top-32 z-10 grid grid-cols-6 gap-x-5 gap-y-8 bg-white px-32 py-16 shadow-invoice"
>
	<div class="col-span-3">
		<img src="/images/logo.png" srcset="/images/logo@2x.png 2x, /images/logo.png 1x" alt="Logo" />
	</div>

	<div class="col-span-2 col-start-5 pt-4">
		<div class="label">From</div>
		{#if $settings && $settings.myName}
			<p>
				{$settings.myName} <br />
				{#if $settings.street && $settings.state && $settings.zip && $settings.city}
					{$settings.street} <br />
					{$settings.city}, {$settings.state}
					{$settings.zip}
				{/if}
			</p>
		{:else}
			<div class="center min-h-[68px] rounded bg-gallery">
				<a href="/settings" class="text-stone-600 underline hover:no-underline"
					>Add your contact information</a
				>
			</div>
		{/if}
	</div>

	<div class="col-span-3">
		<div class="label">Bill To</div>
		<p>
			<strong>{data.invoice.client.name}</strong> <br />
			{data.invoice.client.email} <br />
			{data.invoice.client.street} <br />
			{data.invoice.client.city}, {data.invoice.client.state}
			{data.invoice.client.zipCode}
		</p>
	</div>

	<div class="col-span-2 col-start-5">
		<div class="label">Invoice ID</div>
		<p>{data.invoice.invoiceNumber}</p>
	</div>

	<div class="col-span-3">
		<div class="label">Due Date</div>
		<p>{convertDate(data.invoice.dueDate)}</p>
	</div>

	<div class="col-span-2 col-start-5">
		<div class="label">Issue Date</div>
		<p>{convertDate(data.invoice.issueDate)}</p>
	</div>

	<div class="col-span-6">
		<div class="label">Subject</div>
		<p>{data.invoice.subject}</p>
	</div>

	<!-- Line Items -->
	<div class="col-span-6">
		<LineItemRows
			lineItems={data.invoice.lineItems}
			isEditable={false}
			discount={data.invoice?.discount || 0}
		/>
	</div>

	{#if data.invoice.notes}
		<div class="col-span-6">
			<div class="label">Notes</div>
			<p>
				{data.invoice.notes}
			</p>
		</div>
	{/if}

	{#if data.invoice.terms}
		<div class="col-span-6">
			<div class="label">Terms and Conditions</div>
			<p>
				{data.invoice.terms}
			</p>
		</div>
	{/if}
</div>

<style lang="postcss">
	.label {
		@apply font-black text-monsoon;
	}
</style>
