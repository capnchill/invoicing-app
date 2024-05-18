<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Check from '$lib/components/Icon/Check.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import Snackbar from '$lib/components/Snackbar.svelte';

	import { states } from '$lib/utils/states';
	import { onMount } from 'svelte';
	import { loadSettings, settings, updateSettings } from '$lib/stores/Settings';
	import { snackbar } from '$lib/stores/SnackbarStore';
	import supabase from '$lib/utils/supabase';
	import Loader from '$lib/components/Loader.svelte';
	import { displayErrorMessage } from '$lib/utils/handleError';
	import Alert from '$lib/components/Alert.svelte';

	let mySettings: Settings = {} as Settings;
	let invoiceDetailsLoading = false;
	let accountInfoLoading = false;

	let accountEmail = '',
		newPassword = '',
		confirmPassword = '',
		originalEmailValue = '',
		message = '';

	async function handleInvoiceDetails() {
		invoiceDetailsLoading = true;
		await updateSettings(mySettings);
		invoiceDetailsLoading = false;
	}

	async function handleUpdateAccount() {
		accountInfoLoading = true;

		// check if the email address hasn't changed and password fields are empty
		if (accountEmail === originalEmailValue && !newPassword && !confirmPassword) {
			accountInfoLoading = false;
			snackbar.send({
				message: 'Please enter a new email or password',
				type: 'error'
			});

			return;
		}

		// check if the user wants to update the user
		if (accountEmail !== originalEmailValue) {
			const { error } = await supabase.auth.updateUser({
				email: accountEmail
			});

			if (error) {
				displayErrorMessage(error as Error);
				accountInfoLoading = false;
				return;
			}

			snackbar.send({
				message: 'Check your email and please confirm the change',
				type: 'success'
			});

			accountInfoLoading = false;
			accountEmail = originalEmailValue;
		}

		// check if the user wants to update their password
		if (newPassword || confirmPassword) {
			if (newPassword !== confirmPassword) {
				message = "The passwords don't match";
				accountInfoLoading = false;
				return;
			}

			// update the password
			const { error } = await supabase.auth.updateUser({
				password: newPassword
			});

			if (error) {
				displayErrorMessage(error as Error);
				return;
			}

			snackbar.send({
				message: 'Your Password has been updated',
				type: 'success'
			});
		}

		accountInfoLoading = false;
	}

	onMount(async () => {
		await loadSettings();
		mySettings = { ...$settings };

		// get out logged in user
		let {
			data: { user }
		} = await supabase.auth.getUser();
		accountEmail = user?.email || '';

		originalEmailValue = accountEmail;
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
		<form on:submit|preventDefault={handleInvoiceDetails}>
			<fieldset
				class="grid grid-cols-6 gap-x-5"
				disabled={invoiceDetailsLoading || accountInfoLoading}
			>
				<div class="field col-span-6">
					<label for="myName">Name</label>
					<input type="text" id="myName" name="myName" bind:value={mySettings.myName} />
				</div>

				<div class="field col-span-6">
					<label for="invoiceEmail">Send Invoices from this email</label>
					<input type="email" id="invoiceEmail" name="invoiceEmail" bind:value={mySettings.email} />
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
					<button
						class="button center translate-y-0 gap-x-2 bg-lavenderIndigo text-white shadow-colored transition-all hover:-translate-y-2 hover:shadow-coloredHover"
						type="submit"
					>
						{#if invoiceDetailsLoading}
							<Loader />
							Loading...
						{:else}
							<Check />
							Save
						{/if}
					</button>
				</div>
			</fieldset>
		</form>

		<div class="field col-span-6 mb-8">
			<h2 class="font-sansSerif text-3xl font-bold text-daisyBush">Update Account Information</h2>
			<p class="mb-2">This information is used to login to your account</p>
			<Alert {message} className="bg-scarlet text-goldenFizz" />
		</div>

		<form on:submit|preventDefault={handleUpdateAccount}>
			<fieldset
				class="grid grid-cols-6 gap-x-5"
				disabled={invoiceDetailsLoading || accountInfoLoading}
			>
				<div class="field col-span-6 md:col-span-6">
					<label for="email">Email Address</label>
					<input type="text" id="email" name="email" bind:value={accountEmail} />
				</div>

				<div class="field col-span-6 md:col-span-3">
					<label for="newPassword">New Password</label>
					<input
						type="password"
						id="newPassword"
						name="newPassword"
						bind:value={newPassword}
						on:focus={() => (message = '')}
					/>
				</div>

				<div class="field col-span-6 md:col-span-3">
					<label for="confirmPassword">Confirm New Password</label>
					<input
						type="text"
						id="confirmPassword"
						name="confirmPassword"
						bind:value={confirmPassword}
						on:focus={() => (message = '')}
					/>
				</div>

				<div class="field col-span-6 justify-self-end">
					<button
						class="button center translate-y-0 gap-x-2 bg-lavenderIndigo text-white shadow-colored transition-all hover:-translate-y-2 hover:shadow-coloredHover"
						type="submit"
					>
						{#if invoiceDetailsLoading}
							<Loader />
							Loading...
						{:else}
							<Check />
							Save
						{/if}
					</button>
				</div>
			</fieldset>
		</form>
	</main>
</div>

<style lang="postcss">
	h2 {
		@apply mb-1 text-3xl font-black text-daisyBush;
	}
</style>
