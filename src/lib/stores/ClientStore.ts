import { writable } from 'svelte/store';
import supabase from '$lib/utils/supabase';

export const clients = writable<Client[]>([]);

export async function loadClients() {
	const { data, error } = await supabase.from('client').select('*, invoice(*, lineItems(*))');

	if (error) {
		console.error(error);
		return;
	}

	clients.set(data as Client[]);
}

export function addClient(clientToAdd: Client) {
	clients.update((prev: Client[]) => [...prev, { ...clientToAdd, clientStatus: 'active' }]);
}

export function deleteClient(clientToDelete: Client) {
	clients.update((clientStore) => clientStore.filter((client) => client.id !== clientToDelete.id));
}

export function updateClient(clientToUpdate: Client) {
	clients.update((store) =>
		store.map((client) => (client.id === clientToUpdate.id ? clientToUpdate : client))
	);
}

export async function getClientById(id: string) {
	const { data, error } = await supabase
		.from('client')
		.select('*, invoice(*, client(*), lineItems(*))')
		.eq('id', id);

	if (error) {
		console.error(error);
		return;
	}

	if (data && data[0]) {
		console.log(data[0]);
		return data[0] as Client[];
	}

	console.warn('cannot find client with id: ', id);
}
