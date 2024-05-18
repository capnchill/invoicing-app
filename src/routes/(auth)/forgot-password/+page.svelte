<script lang="ts">
	import { env } from '$env/dynamic/public';
	import Alert from '$lib/components/Alert.svelte';
	import Loader from '$lib/components/Loader.svelte';
	import supabase from '$lib/utils/supabase';

	let email = '';
	let message = '';
	let loading = false;

	async function handleSubmit() {
		loading = true;
		const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
			redirectTo: `${env.PUBLIC_URL}/reset-password`
		});

		if (error) {
			message = error.message;
		} else {
			message = 'Check your email for the password reset link';
		}

		loading = false;
	}
</script>

<h1 class="auth-heading">Forgot Password</h1>

<form on:submit|preventDefault={handleSubmit}>
	<fieldset disabled={loading}>
		<Alert {message} />
		<div class="field">
			<label for="email" class="text-goldenFizz">Email</label>
			<input
				type="email"
				name="email"
				id="email"
				placeholder="Your Email"
				required
				bind:value={email}
			/>
		</div>

		<button class="auth-button center gap-x-2">
			{#if loading}
				<Loader /> Loading
			{:else}
				Send me a reset Email!
			{/if}
		</button>

		<p class="mt-4 text-center text-sm text-white">
			<a href="/login" class="underline hover:no-underline">Ready to Login?</a>
		</p>
	</fieldset>
</form>
