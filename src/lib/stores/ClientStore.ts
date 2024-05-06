import { writable } from 'svelte/store';
import data from '../../seed.json';

export const clients = writable<Client[]>([]);

export function loadClients() {
	clients.set(data.clients);
}

export function addClient(clientToAdd: Client) {
	clients.update((prev: Client[]) => [...prev, clientToAdd]);
}
