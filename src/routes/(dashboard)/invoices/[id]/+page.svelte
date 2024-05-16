<script lang="ts">
	import { loadSettings, settings } from '$lib/stores/Settings';
	import { onMount } from 'svelte';
	import { convertDate } from '$lib/utils/datesHelpers.js';
	import SvelteMarkdown from 'svelte-markdown';
	import { page } from '$app/stores';

	import Button from '$lib/components/Button.svelte';
	import LineItemRows from '../LineItemRows.svelte';

	export let data: { invoice: Invoice };

	let copyLinkLabel: 'Copy Link' | 'Copied!' = 'Copy Link';

	function printInvoice() {
		window.print();
	}

	function copyLink() {
		navigator.clipboard.writeText($page.url.href);
		copyLinkLabel = 'Copied!';
		setTimeout(() => (copyLinkLabel = 'Copy Link'), 1250);
	}

	function payInvoice() {
		console.log('pay invoice');
	}

	function sendInvoice() {
		console.log('send invoice');
	}

	onMount(async () => {
		await loadSettings();
	});
</script>

<div
	class="fixed z-0 mb-16 flex w-full max-w-screen-lg flex-col justify-between gap-y-5 px-4 md:flex-row lg:px-0 print:hidden"
>
	<h1 class="text-3xl font-bold text-daisyBush">Invoice</h1>
	<div class="flex flex-wrap items-center gap-2 sm:flex-nowrap sm:gap-4">
		<Button
			label="Print"
			style="outline"
			onClick={printInvoice}
			isAnimated={false}
			height="short"
		/>
		<Button
			label={copyLinkLabel}
			style="primary"
			onClick={copyLink}
			height="short"
			className="sm:min-w-[168px] min-w-[100px] justify-center"
		/>
		<Button label="Pay Invoice" style="primary" onClick={payInvoice} height="short" />
		<Button label="Send Invoice" style="primary" onClick={sendInvoice} height="short" />
	</div>
</div>

<div
	class="relative top-32 z-10 grid grid-cols-6 gap-x-5 gap-y-8 bg-white px-5 py-8 shadow-invoice md:px-32 md:py-16 print:top-0 print:py-0 print:shadow-none"
>
	<div class="col-span-6 sm:col-span-3 print:col-span-3">
		<img src="/images/logo.png" srcset="/images/logo@2x.png 2x, /images/logo.png 1x" alt="Logo" />
	</div>

	<div class="col-span-6 pt-4 sm:col-span-2 sm:col-start-5">
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

	<div class="col-span-6 sm:col-span-3 print:col-span-3">
		<div class="label">Bill To</div>
		<p>
			{#if data.invoice.client.name}
				<strong>{data.invoice.client.name}</strong> <br />
			{/if}
			{#if data.invoice.client.email}
				{data.invoice.client.email} <br />
			{/if}
			{#if data.invoice.client.street}
				{data.invoice.client.street} <br />
			{/if}
			{#if data.invoice.client.city}
				{data.invoice.client.city}, {data.invoice.client.state}
			{/if}
			{#if data.invoice.client.zip}
				{data.invoice.client.zip}
			{/if}
		</p>
	</div>

	<div class="col-span-6 sm:col-span-2 sm:col-start-5">
		<div class="label">Invoice ID</div>
		<p>{data.invoice.invoiceNumber}</p>
	</div>

	<div class="col-span-3">
		<div class="label">Due Date</div>
		<p>{convertDate(data.invoice.dueDate)}</p>
	</div>

	<div class="col-span-3 sm:col-span-2 sm:col-start-5">
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
			<SvelteMarkdown source={data.invoice.notes} />
		</div>
	{/if}

	{#if data.invoice.terms}
		<div class="col-span-6">
			<div class="label">Terms and Conditions</div>
			<SvelteMarkdown source={data.invoice.terms} />
		</div>
	{/if}
</div>

<style lang="postcss">
	.label {
		@apply font-black text-monsoon;
	}
</style>
