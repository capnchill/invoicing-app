import type { PageLoad } from './$types.js';
import { getClientById } from '$lib/stores/ClientStore.js';

export const load: PageLoad = async ({ params }) => {
	const client = await getClientById(params?.id);
	console.log({ client });
	return { client };
};
