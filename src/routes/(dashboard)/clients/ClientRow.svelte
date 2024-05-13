<script lang="ts">
	// components
	import AdditionalOptions from '$lib/components/AdditionalOptions.svelte';
	import Tag from '$lib/components/Tag.svelte';

	// Helper function
	import { clickOutside } from '$lib/actions/ClickOutside';
	import { swipe } from '$lib/actions/Swipe';

	// icons
	import ThreeDots from '$lib/components/Icon/ThreeDots.svelte';
	import Edit from '$lib/components/Icon/Edit.svelte';
	import Trash from '$lib/components/Icon/Trash.svelte';
	import Cancel from '$lib/components/Icon/Cancel.svelte';
	import View from '$lib/components/Icon/View.svelte';
	import Archive from '$lib/components/Icon/Archive.svelte';
	import Activate from '$lib/components/Icon/Activate.svelte';
	import { deleteClient } from '$lib/stores/ClientStore';
	import { centsToDollars, sumInvoices } from '$lib/utils/moneyHelper';
	import SlidePanel from '$lib/components/SlidePanel.svelte';
	import ClientForm from './ClientForm.svelte';
	import Send from '$lib/components/Icon/Send.svelte';

	let isAdditionalMenuShowing = false;
	let isClientFormShowing = false;
	let isOptionsDisabled = false;
	let triggerReset = false;

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

	function handleArchiveClient() {
		client.clientStatus = 'archive';
		triggerReset = true;
	}

	function handleActiveClient() {
		client.clientStatus = 'active';
		triggerReset = true;
	}

	function handleDelete() {
		deleteClient(client);
		isAdditionalMenuShowing = false;
		triggerReset = true;
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

<div class="relative">
	<div
		class="client-table client-row relative z-row grid grid-cols-clientTableMobile items-center rounded-lg bg-white py-3 shadow-tableRow lg:grid-cols-clientTable lg:py-6"
		use:swipe={{ triggerReset }}
		on:outofview={() => {
			triggerReset = false;
		}}
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
							onClick: () => handleActiveClient(),
							disabled: client.clientStatus === 'active'
						},
						{
							label: 'Archive',
							icon: Archive,
							onClick: () => handleArchiveClient(),
							disabled: client.clientStatus === 'archive'
						},
						{
							label: 'Delete',
							icon: Trash,
							onClick: () => handleDelete(),
							disabled: false
						}
					]}
				/>
			{/if}
		</div>
	</div>

	<!-- swipe to reveal -->
	<div class="swipe-revealed-actions">
		<!-- revealed when we swipe -->
		<button class="action-button" on:click={() => (triggerReset = true)}>
			<Cancel height={32} width={32} />
			Cancel
		</button>

		<button class="action-button" on:click={handleEdit}>
			<Edit height={32} width={32} />
			Edit
		</button>

		{#if client.clientStatus === 'active'}
			<button class="action-button" on:click={handleArchiveClient}>
				<Archive height={32} width={32} />
				Archive
			</button>
		{/if}

		{#if client.clientStatus === 'archive'}
			<button class="action-button" on:click={handleActiveClient}>
				<Activate height={32} width={32} />
				Activate
			</button>
		{/if}

		<button class="action-button" on:click={handleDelete}>
			<Trash height={32} width={32} />
			Delete
		</button>

		<a href={`/clients/${client.id}`} class="action-button">
			<View />
		</a>
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
