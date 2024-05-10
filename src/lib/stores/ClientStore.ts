import { writable } from 'svelte/store';
import data from '../../seed.json';

export const clients = writable<Client[]>([]);

export function loadClients() {
	clients.set(data.clients);
	// clients.set([]);
}

export function addClient(clientToAdd: Client) {
	clients.update((prev: Client[]) => [...prev, clientToAdd]);
}

export function deleteClient(clientToDelete: Client) {
	clients.update((clientStore) => clientStore.filter((client) => client.id !== clientToDelete.id));
}
