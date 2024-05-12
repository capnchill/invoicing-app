<script lang="ts">
	// components
	import AdditionalOptions from '$lib/components/AdditionalOptions.svelte';
	import Tag from '$lib/components/Tag.svelte';

	// Helper function
	import { clickOutside } from '$lib/actions/ClickOutside';

	// icons
	import ThreeDots from '$lib/components/Icon/ThreeDots.svelte';
	import Edit from '$lib/components/Icon/Edit.svelte';
	import Trash from '$lib/components/Icon/Trash.svelte';
	import View from '$lib/components/Icon/View.svelte';
	import Archive from '$lib/components/Icon/Archive.svelte';
	import Activate from '$lib/components/Icon/Activate.svelte';
	import { deleteClient } from '$lib/stores/ClientStore';
	import { centsToDollars, sumInvoices } from '$lib/utils/moneyHelper';
	import SlidePanel from '$lib/components/SlidePanel.svelte';
	import ClientForm from './ClientForm.svelte';

	let isAdditionalMenuShowing = false;
	let isClientFormShowing = false;

	export let client: Client;

	function receivedInvoices() {
		if (client?.invoices) {
			// find invoices that have been paid
			const paidInvoices = client.invoices.filter((invoice) => invoice.invoiceStatus === 'paid');
			return sumInvoices(paidInvoices);
		}
		return 0;
	}

	function balanceInvoices() {
		if (client?.invoices) {
			// find invoices that have not been paid
			const paidInvoices = client.invoices.filter((invoice) => invoice.invoiceStatus !== 'paid');
			return sumInvoices(paidInvoices);
		}
		return 0;
	}

	function handleEdit() {
		isClientFormShowing = true;
		isAdditionalMenuShowing = false;
	}

	function closePanel() {
		isClientFormShowing = false;
	}
</script>

<svelte:window
	on:keydown={(event) => {
		if (event.key === 'Escape') {
			isAdditionalMenuShowing = false;
		}
	}}
/>

<div
	class="client-table client-row grid grid-cols-clientTableMobile items-center rounded-lg py-3 shadow-tableRow lg:grid-cols-clientTable lg:py-6"
>
	<div class="status">
		<Tag label={client.clientStatus} />
	</div>

	<!-- Client Name -->
	<div class="clientName truncate whitespace-nowrap text-base font-bold lg:text-xl">
		{client.name}
	</div>

	<!-- Amount Received -->
	<div class="received text-right font-mono text-sm font-bold lg:text-lg">
		{`$${centsToDollars(receivedInvoices())}`}
	</div>

	<!-- Balance -->
	<div class="balance font-mono text-sm font-bold text-scarlet lg:text-right lg:text-lg">
		{`$${centsToDollars(balanceInvoices())}`}
	</div>

	<!-- View -->
	<div class="view relative hidden justify-center text-pastelPurple hover:text-daisyBush lg:flex">
		<a href="/clients/{client.id}" on:click={() => {}}><View /></a>
	</div>

	<!-- Additional Options -->
	<div
		class="threeDots relative hidden justify-center lg:flex"
		use:clickOutside={() => (isAdditionalMenuShowing = false)}
	>
		<button
			class="text-pastelPurple hover:text-daisyBush"
			on:click={() => {
				isAdditionalMenuShowing = !isAdditionalMenuShowing;
			}}
		>
			<ThreeDots />
		</button>
		{#if isAdditionalMenuShowing}
			<AdditionalOptions
				options={[
					{
						label: 'Edit',
						icon: Edit,
						onClick: () => {
							handleEdit();
						},
						disabled: false
					},
					{
						label: 'Activate',
						icon: Activate,
						onClick: () => {
							client.clientStatus = 'active';
						},
						disabled: client.clientStatus === 'active'
					},
					{
						label: 'Archive',
						icon: Archive,
						onClick: () => {
							client.clientStatus = 'archive';
						},
						disabled: client.clientStatus === 'archive'
					},
					{
						label: 'Delete',
						icon: Trash,
						onClick: () => {
							deleteClient(client);
							isAdditionalMenuShowing = false;
						},
						disabled: false
					}
				]}
			/>
		{/if}
	</div>
</div>

{#if isClientFormShowing}
	<SlidePanel on:closePanel={closePanel}>
		<ClientForm {closePanel} formStatus="edit" {client} />
	</SlidePanel>
{/if}

<style lang="postcss">
	.client-row {
		grid-template-areas:
			'clientName status'
			'received balance';
	}

	@media (min-width: 1024px) {
		.client-row {
			grid-template-areas: 'status clientName received balance view threeDots';
		}
	}

	.clientName {
		grid-area: clientName;
	}

	.status {
		grid-area: status;
	}

	.received {
		@apply text-left lg:text-right;
		grid-area: received;
	}

	.received::before {
		@apply block text-xs font-bold lg:hidden;
		content: 'Received: ';
	}

	.balance {
		grid-area: balance;
	}

	.balance::before {
		@apply block text-xs font-bold lg:hidden;
		content: 'balance: ';
	}
</style>
