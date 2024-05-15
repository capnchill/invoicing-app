import { getClientById } from '$lib/stores/ClientStore.js';

type Props = { params: { id: string } };

export async function load({ params }: Props) {
	const client = await getClientById(params?.id);
	return { client };
}
