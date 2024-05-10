<script lang="ts">
	// components
	import AdditionalOptions from '$lib/components/AdditionalOptions.svelte';
	import Tag from '$lib/components/Tag.svelte';

	// icons
	import ThreeDots from '$lib/components/Icon/ThreeDots.svelte';
	import Edit from '$lib/components/Icon/Edit.svelte';
	import Trash from '$lib/components/Icon/Trash.svelte';
	import View from '$lib/components/Icon/View.svelte';
	import Archive from '$lib/components/Icon/Archive.svelte';
	import Activate from '$lib/components/Icon/Activate.svelte';
	import { deleteClient } from '$lib/stores/ClientStore';
	import { ClientStatus } from '../../../enums';

	let isAdditionalMenuShowing = false;
	export let client: Client;
</script>

<svelte:window
	on:keydown={(event) => {
		if (event.key === 'Escape') {
			isAdditionalMenuShowing = false;
		}
	}}
/>

<div
	class="client-table grid grid-cols-clientTableMobile items-center rounded-lg py-3 shadow-tableRow lg:grid-cols-clientTable lg:py-6"
>
	<div>
		<Tag label={client.clientStatus} />
	</div>

	<!-- Client Name -->
	<div class="truncate whitespace-nowrap text-base font-bold lg:text-xl">{client.name}</div>

	<!-- Amount Received -->
	<div class="text-right font-mono text-sm font-bold lg:text-lg">$504.00</div>

	<!-- Balance -->
	<div class="text-right font-mono text-sm font-bold text-scarlet lg:text-lg">$240.00</div>

	<!-- View -->
	<div class="relative hidden justify-center text-pastelPurple hover:text-daisyBush lg:flex">
		<a href="#"><View /></a>
	</div>

	<!-- Additional Options -->
	<div class="relative hidden justify-center lg:flex">
		<button
			class="text-pastelPurple hover:text-daisyBush"
			on:click={() => {
				isAdditionalMenuShowing = !isAdditionalMenuShowing;
			}}
		>
			<ThreeDots />
		</button>
		{#if isAdditionalMenuShowing}
			<AdditionalOptions
				options={[
					{ label: 'Edit', icon: Edit, onClick: () => console.log('editing'), disabled: false },
					{
						label: 'Activate',
						icon: Activate,
						onClick: () => {
							client.clientStatus = 'active';
						},
						disabled: client.clientStatus === 'active'
					},
					{
						label: 'Archive',
						icon: Archive,
						onClick: () => {
							client.clientStatus = 'archive';
						},
						disabled: client.clientStatus === 'archive'
					},
					{
						label: 'Delete',
						icon: Trash,
						onClick: () => {
							deleteClient(client);
							isAdditionalMenuShowing = false;
						},
						disabled: false
					}
				]}
			/>
		{/if}
	</div>
</div>
