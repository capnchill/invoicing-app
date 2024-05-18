<script lang="ts">
	import { goto } from '$app/navigation';
	import Alert from '$lib/components/Alert.svelte';
	import Loader from '$lib/components/Loader.svelte';
	import supabase from '$lib/utils/supabase';

	let newPassword = '';
	let confirmPassword = '';
	let message = '';
	let loading = false;

	async function handleSubmit() {
		loading = true;
		if (newPassword !== confirmPassword) {
			message = "Passwords don't match";
			loading = false;
			return;
		}
		const { data, error } = await supabase.auth.updateUser({
			password: newPassword
		});

		if (error) {
			message = error.message;
			loading = false;
			return;
		}

		loading = false;
		goto('/invoices');
	}
</script>

<h1 class="auth-heading">Reset Password</h1>

<form on:submit|preventDefault={handleSubmit}>
	<fieldset disabled={loading}>
		<Alert {message} />
		<div class="field">
			<label for="newPassword" class="text-goldenFizz">New Password</label>
			<input type="password" name="newPassword" id="newPassword" bind:value={newPassword} />
		</div>

		<div class="field">
			<label for="confirmPassword" class="text-goldenFizz">Confirm Password</label>
			<input
				type="password"
				name="confirmPassword"
				id="confirmPassword"
				bind:value={confirmPassword}
			/>
		</div>

		<button class="auth-button center gap-x-2" type="submit">
			{#if loading}
				<Loader />
				Loading
			{:else}
				Update my password
			{/if}
		</button>

		<p class="mt-4 text-center text-sm text-white">
			<a href="/login" class="underline hover:no-underline">I'm ready to login.</a>
		</p>
	</fieldset>
</form>
