<script lang="ts">
	import { slide } from 'svelte/transition';
	import Button from '$lib/components/Button.svelte';
	import Trash from '$lib/components/Icon/Trash.svelte';
	import LineItemRows from './LineItemRows.svelte';
	import { v4 as uuidv4 } from 'uuid';
	import { states } from '$lib/utils/states';
	import { onMount } from 'svelte';
	import { loadClients, clients, addClient } from '$lib/stores/ClientStore';
	import { today } from '$lib/utils/datesHelpers';
	import { addInvoice, updateInvoice } from '$lib/stores/InvoiceStore';
	import ConfirmDelete from './ConfirmDelete.svelte';
	import { snackbar } from '$lib/stores/SnackbarStore';

	export let formState: 'edit' | 'create' = 'create';
	export let closePanel: () => void = () => {};

	const blankLineItem = {
		description: '',
		id: uuidv4(),
		amount: 0,
		quantity: 0
	};

	export let invoice: Invoice = {
		client: {} as Client,
		lineItems: [{ ...blankLineItem }] as LineItem[]
	} as Invoice;

	let newClient: Partial<Client> = {};
	let isModalShowing = false;
	const intialDiscount = invoice.discount || 0;
	let isNewClient = false;

	function AddLineItem() {
		invoice.lineItems = [...(invoice.lineItems as []), { ...blankLineItem, id: uuidv4() }];
	}

	function RemoveLineItem(event: CustomEvent) {
		invoice.lineItems =
			invoice?.lineItems && invoice.lineItems.filter((item) => item.id !== event.detail);
		console.log('remove line item');
	}

	function UpdateLineItem() {
		invoice.lineItems = invoice.lineItems;
	}

	async function handleSubmit() {
		if (isNewClient) {
			invoice.client = newClient as Client;
			const addedClient = await addClient(newClient as Client);
			invoice.client.id = addedClient?.id;
		}

		if (formState === 'create') {
			await addInvoice(invoice);
		} else {
			updateInvoice(invoice);
		}

		closePanel();
	}

	function UpdateDiscount(event: CustomEvent) {
		invoice.discount = event.detail.discount;
	}

	onMount(() => {
		loadClients();
	});
</script>

<h2 class="mb-7 font-sansSerif text-3xl font-bold text-daisyBush">
	{#if formState === 'create'}
		Add
	{:else}
		Edit
	{/if} an Invoice
</h2>

<form class="grid grid-cols-6 gap-x-5" on:submit|preventDefault={handleSubmit}>
	<!-- client -->
	<div class="field col-span-6 md:col-span-4">
		{#if !isNewClient}
			<label for="client">Client</label>

			<div class="flex flex-wrap items-end gap-x-2 sm:flex-nowrap md:gap-x-5">
				<select
					name="client"
					id="client"
					class="mb-2 bg-transparent sm:mb-0"
					required={!isNewClient}
					bind:value={invoice.client.id}
					on:change={() => {
						let selectedClient = $clients.find((client) => client.id === invoice.client.id);
						invoice.client.name = selectedClient?.name !== undefined ? selectedClient.name : '';
					}}
				>
					<option />
					{#each $clients as client}
						<option value={client.id}>{client.name}</option>
					{/each}
				</select>
				<div class="text-base font-bold leading-[2.25rem] text-monsoon lg:leading-[3.5rem]">or</div>
				<Button
					label="+ Client"
					isAnimated={false}
					style="outline"
					onClick={() => {
						isNewClient = true;
						invoice.client.name = '';
						invoice.client.email = '';
					}}
				/>
			</div>
		{:else}
			<label for="newClient">New Client</label>
			<div class="flex flex-wrap items-end gap-x-2 sm:flex-nowrap md:gap-x-5">
				<input
					type="text"
					name="newClient"
					required={isNewClient}
					bind:value={newClient.name}
					class="mb-2 sm:mb-0"
				/>
				<div class="text-base font-bold leading-[2.25rem] text-monsoon lg:leading-[3.5rem]">or</div>
				<Button
					label="Existing Client"
					isAnimated={false}
					style="outline"
					onClick={() => {
						isNewClient = false;
						newClient = {};
					}}
				/>
			</div>
		{/if}
	</div>

	<!-- Invoice id -->
	<div class="field col-span-6 row-start-1 md:col-span-2 md:row-start-auto">
		<label for="invoiceNumber">Invoice id</label>
		<input
			type="number"
			name="invoiceNumber"
			id="invoiceNumber"
			required
			bind:value={invoice.invoiceNumber}
		/>
	</div>

	<!-- New client information -->
	{#if isNewClient}
		<div class="field col-span-6 grid gap-x-5" transition:slide>
			<div class="field col-span-6">
				<label for="email">Client's Email</label>
				<input
					type="email"
					name="email"
					id="email"
					required={isNewClient}
					bind:value={newClient.email}
				/>
			</div>

			<div class="field col-span-6">
				<label for="street">Street</label>
				<input type="text" name="street" id="street" bind:value={newClient.street} />
			</div>

			<div class="field col-span-2">
				<label for="city">City</label>
				<input type="text" name="city" id="city" bind:value={newClient.city} />
			</div>

			<div class="field col-span-2">
				<label for="state">State</label>
				<select name="state" id="state" class="bg-transparent" bind:value={newClient.state}>
					<option />
					{#each states as state}
						<option value={state.value}>{state.name}</option>
					{/each}
				</select>
			</div>

			<div class="field col-span-2">
				<label for="zipCode">Zip Code</label>
				<input type="text" name="zipCode" id="zipCode" bind:value={newClient.zip} />
			</div>
		</div>
	{/if}

	<!-- due date -->
	<div class="field col-span-3 sm:col-span-2">
		<label for="dueDate">Due Date</label>
		<input
			type="date"
			name="dueDate"
			id="dueDate"
			min={today}
			required
			bind:value={invoice.dueDate}
		/>
	</div>

	<!-- issue date -->
	<div class="field col-span-3 md:col-span-2 md:col-start-5">
		<label for="issueDate">Issue Date</label>
		<input
			type="date"
			name="issueDate"
			id="issueDate"
			min={today}
			required
			bind:value={invoice.issueDate}
		/>
	</div>

	<!-- subject -->
	<div class="field col-span-6">
		<label for="subject">Subject</label>
		<input type="text" name="subject" id="subject" bind:value={invoice.subject} />
	</div>

	<!-- invoice items table -->
	<div class="field col-span-6">
		<LineItemRows
			discount={invoice.discount}
			lineItems={invoice.lineItems}
			on:addLineItem={AddLineItem}
			on:removeLineItem={RemoveLineItem}
			on:updateLineItem={UpdateLineItem}
			on:updateDiscount={UpdateDiscount}
		/>
	</div>

	<!-- Notes -->
	<div class="field col-span-6">
		<label for="notes"
			>Notes <span class="font-normal">(optional, displayed on invoice )</span>
		</label>
		<textarea name="notes" id="notes" bind:value={invoice.notes} />
	</div>

	<!-- Terms -->
	<div class="field col-span-6">
		<label for="terms"
			>Terms <span class="font-normal">(optional, enter your terms and conditions)</span>
		</label>
		<textarea name="terms" id="terms" bind:value={invoice.terms} />
		<div class="text-xs text-gray-400">
			formatting tips: <strong>*bold*</strong>, <em>_italics_</em>
		</div>
	</div>

	<!-- action buttons -->

	<div class="field col-span-2">
		{#if formState === 'edit'}
			<!-- show delete button only when the invoice being edited -->
			<Button
				label="Delete"
				isAnimated={false}
				style="textOnlyDestructive"
				onClick={() => (isModalShowing = true)}
				iconLeft={Trash}
			/>
		{/if}
	</div>

	<div class="field col-span-4 flex justify-end gap-x-5">
		<Button label="Cancel" style="secondary" isAnimated={false} onClick={() => closePanel()} />
		<button
			class="button translate-y-0 bg-lavenderIndigo text-white shadow-colored transition-all hover:-translate-y-2 hover:shadow-coloredHover"
			type="submit">Save</button
		>
		<!-- using a standard save button instead of the button component here, 
			becuase the standard button component has a prevent default event modifier attached to it -->
	</div>
</form>

<ConfirmDelete
	{invoice}
	{isModalShowing}
	on:close={() => {
		isModalShowing = false;
		closePanel();
	}}
/>
