<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Check from '$lib/components/Icon/Check.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import Snackbar from '$lib/components/Snackbar.svelte';

	import { states } from '$lib/utils/states';
	import { onMount } from 'svelte';
	import { loadSettings, settings } from '$lib/stores/Settings';
	import { snackbar } from '$lib/stores/SnackbarStore';

	let mySettings: Settings = {} as Settings;

	onMount(() => {
		loadSettings();
		mySettings = { ...$settings };
	});
</script>

<div class="grid min-h-screen grid-cols-12 bg-whisper md:gap-x-16">
	<Snackbar />
	<Navbar />
	<main
		class="md:col-start col-span-12 px-4 pt-4 md:col-span-8 md:pt-20 lg:col-span-6 lg:col-start-5"
	>
		<h2>Invoice Details</h2>
		<p class="mb-8">This information gets included on each invoice</p>
		<form class=" grid grid-cols-6 gap-x-5" on:submit|preventDefault={() => {}}>
			<div class="field col-span-6">
				<label for="myName">Name</label>
				<input type="text" id="myName" name="myName" bind:value={mySettings.myName} />
			</div>

			<div class="field col-span-6">
				<label for="street">Address</label>
				<input type="text" id="street" name="street" bind:value={mySettings.street} />
			</div>

			<div class="field col-span-6 md:col-span-2">
				<label for="city">City</label>
				<input type="text" id="city" name="city" bind:value={mySettings.city} />
			</div>

			<div class="field col-span-6 md:col-span-2">
				<label for="state">State</label>
				<select name="state" id="state" class="bg-transparent" bind:value={mySettings.state}>
					<option />
					{#each states as state}
						<option value={state.value}>{state.name}</option>
					{/each}
				</select>
			</div>

			<div class="field col-span-6 md:col-span-2">
				<label for="zip">Zip Code</label>
				<input type="text" id="zip" name="zip" bind:value={mySettings.zip} />
			</div>

			<div class="field col-span-6 justify-self-end">
				<Button
					label="Save"
					iconLeft={Check}
					onClick={() => {
						settings.update((store) => mySettings);
						snackbar.send({
							message: 'Settings updated successfully',
							type: 'success'
						});
					}}
				/>
			</div>
		</form>

		<div class="field col-span-6">
			<h2 class="font-sansSerif text-3xl font-bold text-daisyBush">Update Account Information</h2>
			<p class="mb-8">This information is used to access your account</p>
		</div>

		<form class="grid grid-cols-6 gap-x-5">
			<div class="field col-span-6 md:col-span-3">
				<label for="email">Email Address</label>
				<input type="text" id="email" name="email" />
			</div>

			<div class="field col-span-6 md:col-span-3">
				<label for="currentPassword">Current Password</label>
				<input type="password" id="currentPassword" name="currentPassword" />
			</div>

			<div class="field col-span-6 md:col-span-3">
				<label for="newPassword">Password</label>
				<input type="password" id="newPassword" name="newPassword" />
			</div>

			<div class="field col-span-6 md:col-span-3">
				<label for="confirmPassword">Confirm New Password</label>
				<input type="text" id="confirmPassword" name="confirmPassword" />
			</div>

			<div class="field col-span-6 justify-self-end">
				<Button label="Save" iconLeft={Check} onClick={() => {}} />
			</div>
		</form>
	</main>
</div>

<style lang="postcss">
	h2 {
		@apply mb-1 text-3xl font-black text-daisyBush;
	}
</style>
