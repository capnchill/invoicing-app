<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Trash from '$lib/components/Icon/Trash.svelte';
	import LineItemsRow from './LineItemRows.svelte';
	import { v4 as uuidv4 } from 'uuid';

	const blankLineItem = {
		description: '',
		Id: uuidv4(),
		amount: 0,
		quantity: 0
	};

	// a copy of the blankLineItem is passed so that the data binding does not update the original object itself
	let lineItems: lineItems[] = [{ ...blankLineItem }];

	function AddLineItem() {
		lineItems.push({ ...blankLineItem, Id: uuidv4() });
		lineItems = lineItems;
	}

	function RemoveLineItem(event) {
		lineItems = lineItems.filter((item) => item.Id !== event.detail);
		console.log('remove line item');
	}
</script>

<h2 class="mb-7 font-sansSerif text-3xl font-bold text-daisyBush">Add an Invoice</h2>

<form class="grid grid-cols-6 gap-x-5 gap-y-5">
	<!-- client -->
	<div class="field col-span-2">
		<label for="client">Client</label>
		<select name="client" id="client" class="bg-white">
			<option value="Zeak">ZEAL</option>
		</select>
	</div>

	<div class="field col-span-2 flex items-end gap-x-5">
		<div class="text-base font-bold leading-[3.5rem] text-monsoon">or</div>
		<Button label="+ Client" isAnimated={false} style="outline" onClick={() => {}} />
	</div>

	<!-- Invoice id -->
	<div class="field col-span-2">
		<label for="id">Invoice id</label>
		<input type="number" name="id" id="id" />
	</div>

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
		<LineItemsRow {lineItems} on:addLineItem={AddLineItem} on:removeLineItem={RemoveLineItem} />
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
