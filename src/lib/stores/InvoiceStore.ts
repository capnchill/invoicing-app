import { writable } from 'svelte/store';
import supabase from '$lib/utils/supabase';

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

export function addInvoice(invoiceToAdd: Invoice) {
	invoices.update((prev: Invoice[]) => [...prev, invoiceToAdd]);
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
		console.log(data);
		return data[0] as Invoice;
	}

	console.warn('cannot find invoice with id: ' + id);
}
