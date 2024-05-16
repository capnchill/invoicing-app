<script lang="ts">
	import { goto } from '$app/navigation';
	import Alert from '$lib/components/Alert.svelte';
	import Loader from '$lib/components/Loader.svelte';
	import supabase from '$lib/utils/supabase';

	let email: string,
		password: string,
		message = '',
		isLoading = false;

	async function handleSubmit() {
		isLoading = true;

		const userLogin = await supabase.auth.signInWithPassword({ email, password });

		if (userLogin.error) {
			console.error(userLogin.error);
			message = userLogin.error.message;
			isLoading = false;
			return;
		}

		message = '';
		isLoading = false;
		goto('/invoices');
	}
</script>

<h1 class="auth-heading">Login</h1>

<form on:submit|preventDefault={handleSubmit}>
	<Alert {message} />

	<div class="field">
		<label for="email" class="text-goldenFizz">Email</label>
		<input type="text" name="email" id="email" bind:value={email} disabled={isLoading} />
	</div>

	<div class="field">
		<div class="flex justify-between">
			<label for="password" class="text-goldenFizz">Password</label>
			<a href="/forgot-password" class="text-sm text-white underline hover:no-underline"
				>Forgot Password?</a
			>
		</div>
		<input
			type="password"
			name="password"
			id="password"
			placeholder="Your Password"
			bind:value={password}
			disabled={isLoading}
		/>
	</div>

	<div class="field">
		<button class="auth-button center gap-x-2" type="submit">
			{#if isLoading}
				<Loader />
				Loading
			{:else}
				Login
			{/if}
		</button>
		<p class="mt-4 text-center text-sm text-white">
			<a href="/signup" class="underline hover:no-underline"> Don't have an account yet? </a>
		</p>
	</div>
</form>
