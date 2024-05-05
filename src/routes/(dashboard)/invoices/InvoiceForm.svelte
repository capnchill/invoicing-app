<script lang="ts">
	import { slide } from 'svelte/transition';
	import Button from '$lib/components/Button.svelte';
	import Trash from '$lib/components/Icon/Trash.svelte';
	import LineItemsRow from './LineItemRows.svelte';
	import { v4 as uuidv4 } from 'uuid';
	import { states } from '$lib/utils/states';
	import { onMount } from 'svelte';
	import { loadClients, clients } from '$lib/stores/ClientStore';

	const blankLineItem = {
		description: '',
		Id: uuidv4(),
		amount: 0,
		quantity: 0
	};

	// a copy of the blankLineItem is passed so that the data binding does not update the original object itself
	let lineItems: lineItems[] = [{ ...blankLineItem }];
	let isNewClient = false;

	function AddLineItem() {
		lineItems.push({ ...blankLineItem, Id: uuidv4() });
		lineItems = lineItems;
	}

	function RemoveLineItem(event) {
		lineItems = lineItems.filter((item) => item.Id !== event.detail);
		console.log('remove line item');
	}

	function UpdateLineItem() {
		lineItems = lineItems;
	}

	onMount(() => {
		loadClients();
		console.log($clients);
	});
</script>

<h2 class="mb-7 font-sansSerif text-3xl font-bold text-daisyBush">Add an Invoice</h2>

<form class="grid grid-cols-6 gap-x-5 gap-y-5">
	<!-- client -->
	<div class="field col-span-4">
		{#if !isNewClient}
			<label for="client">Client</label>

			<div class="flex items-end gap-x-5">
				<select name="client" id="client" class="bg-transparent">
					{#each $clients as client}
						<option value={client.id}>{client.name}</option>
					{/each}
				</select>
				<div class="text-base font-bold leading-[3.5rem] text-monsoon">or</div>
				<Button
					label="+ Client"
					isAnimated={false}
					style="outline"
					onClick={() => {
						isNewClient = true;
					}}
				/>
			</div>
		{:else}
			<label for="newClient">New Client</label>
			<div class="flex items-end gap-x-5">
				<input type="text" name="newClient" />
				<div class="text-base font-bold leading-[3.5rem] text-monsoon">or</div>
				<Button
					label="Existing Client"
					isAnimated={false}
					style="outline"
					onClick={() => {
						isNewClient = false;
					}}
				/>
			</div>
		{/if}
	</div>

	<!-- Invoice id -->
	<div class="field col-span-2">
		<label for="id">Invoice id</label>
		<input type="number" name="id" id="id" />
	</div>

	<!-- New client information -->
	{#if isNewClient}
		<div class="field col-span-6 grid gap-6" transition:slide>
			<div class="field col-span-6">
				<label for="email">Client's Email</label>
				<input type="email" name="email" id="email" />
			</div>

			<div class="field col-span-6">
				<label for="street">Street</label>
				<input type="text" name="street" id="street" />
			</div>

			<div class="field col-span-2">
				<label for="city">City</label>
				<input type="text" name="city" id="city" />
			</div>

			<div class="field col-span-2">
				<label for="state">State</label>
				<select name="state" id="state" class="bg-transparent">
					<option />
					{#each states as state}
						<option value={state.value}>{state.name}</option>
					{/each}
				</select>
			</div>

			<div class="field col-span-2">
				<label for="zipCode">Zip Code</label>
				<input type="text" name="zipCode" id="zipCode" />
			</div>
		</div>
	{/if}

	<!-- due date -->
	<div class="field col-span-2">
		<label for="dueDate">Due Date</label>
		<input type="date" name="dueDate" id="dueDate" />
	</div>

	<!-- issue date -->
	<div class="field col-span-2 col-start-5">
		<label for="issueDate">Issue Date</label>
		<input type="date" name="issueDate" id="issueDate" />
	</div>

	<!-- subject -->
	<div class="field col-span-6">
		<label for="subject">Subject</label>
		<input type="text" name="subject" id="subject" />
	</div>

	<!-- invoice items table -->
	<div class="field col-span-6">
		<LineItemsRow
			{lineItems}
			on:addLineItem={AddLineItem}
			on:removeLineItem={RemoveLineItem}
			on:updateLineItem={UpdateLineItem}
		/>
	</div>

	<!-- Notes -->
	<div class="field col-span-6">
		<label for="notes"
			>Notes <span class="font-normal">(optional, displayed on invoice )</span>
		</label>
		<textarea name="notes" id="notes" />
	</div>

	<!-- Terms -->
	<div class="field col-span-6">
		<label for="terms"
			>Terms <span class="font-normal">(optional, enter your terms and conditions)</span>
		</label>
		<textarea name="terms" id="terms" />
		<div class="text-xs text-gray-400">
			formatting tips: <strong>*bold*</strong>, <em>_italics_</em>
		</div>
	</div>

	<!-- action buttons -->
	<div class="field col-span-2">
		<!-- show delete button only when the invoice being edited -->
		<Button
			label="Delete"
			isAnimated={false}
			style="textOnlyDestructive"
			onClick={() => {}}
			iconLeft={Trash}
		/>
	</div>

	<div class="field col-span-4 flex justify-end gap-x-5">
		<Button label="Cancel" style="secondary" isAnimated={false} onClick={() => {}} />
		<Button label="Save" style="outline" isAnimated={false} onClick={() => {}} />
	</div>
</form>
