<script lang="ts">
	import { clients, loadClients } from '$lib/stores/ClientStore';
	import { onMount } from 'svelte';

	import Search from '$lib/components/Search.svelte';
	import Button from '$lib/components/Button.svelte';
	import ClientRowHeader from './ClientRowHeader.svelte';
	import ClientRow from './ClientRow.svelte';
	import BlankStateClient from './BlankStateClient.svelte';
	import SlidePanel from '$lib/components/SlidePanel.svelte';
	import ClientForm from './ClientForm.svelte';
	import NoSearchResult from './NoSearchResults.svelte';

	let isClientFormShowing = false;
	let clientList: Client[] = [];

	function closePanel() {
		isClientFormShowing = false;
	}

	function searchClient(event: CustomEvent) {
		const keywords = event.detail.searchTerms;

		clientList = $clients.filter((client) => {
			return (
				client?.name.toLowerCase().includes(keywords.toLowerCase()) ||
				client?.email.toLowerCase().includes(keywords.toLowerCase())
			);
		});
	}

	function clearSearch(event: CustomEvent) {
		if (event.detail.searchTerms === '') {
			clientList = $clients;
		}
	}

	$: clientList = $clients;

	onMount(async () => {
		await loadClients();
	});
</script>

<svelte:head>
	<title>Clients | Invoicing App</title>
</svelte:head>

<div
	class="mb-7 flex flex-col-reverse items-start justify-between gap-y-6 md:flex-row md:items-center md:gap-y-4 lg:mb-16"
>
	<!-- Search Field -->
	{#if $clients.length > 0}
		<Search on:search={searchClient} on:clear={clearSearch} />
	{:else}
		<div></div>
	{/if}

	<!-- new invoice button -->
	<div>
		<Button
			label="+ Clients"
			onClick={() => {
				isClientFormShowing = true;
			}}
			isAnimated={true}
		/>
	</div>
</div>

<!-- Clients -->
<div>
	{#if $clients === null}
		loading
	{:else if $clients.length <= 0}
		<BlankStateClient />
	{:else if clientList.length <= 0}
		<NoSearchResult />
	{:else}
		<!-- Client Header row -->
		<ClientRowHeader />

		<!-- Client row -->
		<!-- flex col reverse is given so that the Additional menu drop down does not overlap with each other incorrectly -->
		<div class="flex flex-col-reverse">
			{#each clientList as client}
				<ClientRow {client} />
			{/each}
		</div>
	{/if}
</div>

{#if isClientFormShowing}
	<SlidePanel on:closePanel={closePanel}>
		<ClientForm {closePanel} />
	</SlidePanel>
{/if}
