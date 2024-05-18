import { getClientById } from '$lib/stores/ClientStore.js';

export async function load(event) {
	const client = await getClientById(event?.params?.id);
	return { client };
}
