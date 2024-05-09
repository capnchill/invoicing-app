<script lang="ts">
	import Button from '$lib/components/Button.svelte';

	export let data;

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
		<p>
			Subodh Chilwal <br />
			123 Impressive Street <br />
			Awesome country, DL 54321
		</p>
	</div>

	<div class="col-span-3">
		<div class="label">Bill To</div>
		<p>
			<strong>ACME CORP</strong>
			acme@example.com <br />
			789 rainbow street <br />
			Anywhereville, DL 762365
		</p>
	</div>

	<div class="col-span-2 col-start-5">
		<div class="label">Invoice ID</div>
		<p>12348</p>
	</div>

	<div class="col-span-3">
		<div class="label">Due Date</div>
		<p>10 / 6 / 2022</p>
	</div>

	<div class="col-span-2 col-start-5">
		<div class="label">Issue Date</div>
		<p>7/6/2022</p>
	</div>

	<div class="col-span-6">
		<div class="label">Subject</div>
		<p>Website</p>
	</div>

	<div class="col-span-6">
		<!-- Line Items -->
		Line items
	</div>

	<div class="col-span-6">
		<div class="label">Notes</div>
		<p>Lorem ipsum</p>
	</div>

	<div>
		<div class="label">Terms and Conditions</div>
		<p>Lorem ipsum</p>
	</div>
</div>

<style lang="postcss">
	.label {
		@apply font-black text-monsoon;
	}
</style>
