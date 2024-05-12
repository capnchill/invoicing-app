import { writable } from 'svelte/store';
import data from '../../seed.json';

export const clients = writable<Client[]>([]);

export function loadClients() {
	clients.set(data.clients);
	// clients.set([]);
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

export function getClientById(id: string) {
	return data.clients.find((client) => client.id === id);
}
