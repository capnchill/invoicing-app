import { writable } from 'svelte/store';
import data from '../../seed.json';

export const invoices = writable<Invoice[]>([]);

export function loadInvoices() {
	invoices.set(data.invoices);
	// invoices.set([]);
}
