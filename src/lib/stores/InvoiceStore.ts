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
		.insert([{ ...newInvoice, clientId: client.id }])
		.select();

	if (invoiceResults.error) {
		displayErrorMessage(invoiceResults.error as Error);
		return;
	}

	// get the invoice id
	const invoiceId = invoiceResults.data[0].id;

	// loop over individual line items, add the invoice id to them
	if (lineItems && lineItems.length > 0) {
		const newLineItems = lineItems?.map((lineItem) => ({
			...lineItem,
			invoiceId
		}));

		// add the line item to supabase
		const lineItemsResults = await supabase.from('lineItems').insert(newLineItems);

		if (lineItemsResults.error) {
			displayErrorMessage(lineItemsResults.error as Error);
			return;
		}
	}

	// update the store
	invoices.update((prev: Invoice[]) => [...prev, { ...invoiceToAdd, id: invoiceId }]);
	snackbar.send({
		message: `Your invoice was successfully created`,
		type: 'success'
	});
	return invoiceToAdd;
}

export function updateInvoice(invoiceToUpdate: Invoice) {
	invoices.update((prev: Invoice[]) =>
		prev.map((curr) => (curr.id === invoiceToUpdate.id ? invoiceToUpdate : curr))
	);
	return invoiceToUpdate;
}

export function deleteInvoice(invoiceToDelete: Invoice) {
	invoices.update((prev: Invoice[]) => prev.filter((invoice) => invoice.id !== invoiceToDelete.id));

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
