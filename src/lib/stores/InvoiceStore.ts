import { writable } from 'svelte/store';
import supabase from '$lib/utils/supabase';
import { displayErrorMessage } from '$lib/utils/handleError';
import { snackbar } from '$lib/stores/SnackbarStore';

export const invoices = writable<Invoice[]>([]);

export async function loadInvoices() {
	const { error, data } = await supabase
		.from('invoice')
		.select('*, client(id, name), lineItems(*)');

	if (error) {
		console.error(error);
		return;
	}

	invoices.set(data as Invoice[]);
}

export async function addInvoice(invoiceToAdd: Invoice) {
	const { lineItems, client, ...newInvoice } = invoiceToAdd;

	// add the invoice to supabase
	const invoiceResults = await supabase
		.from('invoice')
		.insert([{ ...newInvoice, clientId: client.id, invoiceStatus: 'draft' }])
		.select();

	if (invoiceResults.error) {
		displayErrorMessage(invoiceResults.error as Error);
		return;
	}

	// get the invoice id
	const invoiceId = invoiceResults.data[0].id;

	// loop over individual line items, add the invoice id to them
	const isSuccessful = await addLineItems(lineItems, invoiceId);
	if (!isSuccessful) {
		return;
	}

	// update the store
	invoices.update((prev: Invoice[]) => [...prev, { ...invoiceToAdd, id: invoiceId }]);
	snackbar.send({
		message: `Your invoice was successfully created`,
		type: 'success'
	});
	return invoiceToAdd;
}

async function deleteLineItems(invoiceId: string): Promise<boolean | undefined> {
	let isSuccessful = true;

	const { data, error } = await supabase.from('lineItems').delete().eq('invoiceId', invoiceId);

	if (error) {
		displayErrorMessage(error);
		isSuccessful = false;
	}

	return isSuccessful;
}

async function addLineItems(
	lineItems: LineItem[] | undefined,
	invoiceId: string
): Promise<boolean> {
	let isSuccessful = true;

	// add all the line items
	// loop over individual line items, add the invoice id to them
	if (lineItems && lineItems.length > 0) {
		const newLineItems = lineItems?.map((lineItem) => ({ ...lineItem, invoiceId }));

		// add the line item to supabase
		const lineItemsResults = await supabase.from('lineItems').insert(newLineItems);

		if (lineItemsResults.error) {
			displayErrorMessage(lineItemsResults.error as Error);
			isSuccessful = false;
		}
	}
	return isSuccessful;
}

export async function updateInvoice(invoiceToUpdate: Invoice) {
	const { lineItems, client, ...updatedInvoice } = invoiceToUpdate;

	// delete all line items
	let isSuccessful = await deleteLineItems(invoiceToUpdate.id);
	if (!isSuccessful) {
		return;
	}

	// add all the line items
	isSuccessful = await addLineItems(lineItems, invoiceToUpdate.id);
	if (!isSuccessful) {
		return;
	}

	// update invoice
	const { data, error } = await supabase
		.from('invoice')
		.update({ ...updatedInvoice, clientId: client.id })
		.eq('id', invoiceToUpdate.id);

	if (error) {
		displayErrorMessage(error as Error);
		return;
	}

	// update store
	invoices.update((prev: Invoice[]) =>
		prev.map((curr) => (curr.id === invoiceToUpdate.id ? invoiceToUpdate : curr))
	);

	// display snackbar
	snackbar.send({
		message: 'Your Invoice was successfully updated',
		type: 'success'
	});

	return invoiceToUpdate;
}

export async function deleteInvoice(invoiceToDelete: Invoice) {
	// delete invoice
	const { error } = await supabase.from('invoice').delete().eq('id', invoiceToDelete.id);

	if (error) {
		displayErrorMessage(error as Error);
		return;
	}

	// update store
	invoices.update((prev: Invoice[]) => prev.filter((invoice) => invoice.id !== invoiceToDelete.id));

	// display snackbar message
	snackbar.send({
		message: 'Your Invoice was successfully deleted',
		type: 'success'
	});

	return invoiceToDelete;
	// the same invoice is returned that was passed in so that we can show the invoice in toasters, success messages
}

export async function getInvoiceById(id: string) {
	const { error, data } = await supabase
		.from('invoice')
		.select('*, client(*), lineItems(*)')
		.eq('id', id);

	if (error) {
		console.error(error);
		return;
	}

	if (data && data[0]) {
		return data[0] as Invoice;
	}

	console.warn('cannot find invoice with id: ' + id);
}
