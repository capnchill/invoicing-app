<script lang="ts">
	import Modal from '$lib/components/Modal.svelte';
	import Button from '$lib/components/Button.svelte';
	import { deleteClient } from '$lib/stores/ClientStore';
	import { createEventDispatcher } from 'svelte';

	export let client: Client;
	export let isModalShowing = false;

	async function handleDelete() {
		await deleteClient(client);
		dispatch('close');
	}

	let dispatch = createEventDispatcher();
</script>

<Modal isVisible={isModalShowing} on:close={() => (isModalShowing = false)} on:close>
	<div class="flex h-full min-h-[175px] flex-col items-center justify-between gap-6">
		<div class="text-center text-xl font-bold text-daisyBush">
			Are you sure you want to delete this client
			<span class="text-scarlet">{client.name}</span> and all their invoice?
		</div>
		<div class="flex gap-4">
			<Button
				label="Cancel"
				onClick={() => dispatch('close')}
				isAnimated={false}
				style="secondary"
			/>
			<Button
				label="Yes, Delete it"
				onClick={handleDelete}
				isAnimated={false}
				style="destructive"
			/>
		</div>
	</div>
</Modal>
