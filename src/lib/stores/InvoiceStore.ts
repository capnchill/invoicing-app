import { writable } from 'svelte/store';
import data from '../../seed.json';

export const invoices = writable<Invoice[]>([]);

export function loadInvoices() {
	invoices.set(data.invoices);
	// invoices.set([]);
}

export function deleteInvoice(invoiceToDelete: Invoice) {
	invoices.update((prev: Invoice[]) => prev.filter((invoice) => invoice.id !== invoiceToDelete.id));

	return invoiceToDelete;
	// the same invoice is returned that was passed in so that we can show the invoice in toasters, success messages
}
