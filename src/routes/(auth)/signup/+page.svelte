<script lang="ts">
	import Alert from '$lib/components/Alert.svelte';
	import Loader from '$lib/components/Loader.svelte';
	import supabase from '$lib/utils/supabase';

	let fullName: string,
		email: string,
		password: string,
		confirmPassword: string,
		message: string = '',
		isSignupFormShowing = true,
		isLoading = false;

	async function handleSubmit() {
		isLoading = true;
		// make sure password and confirm password match
		if (password !== confirmPassword) {
			message = "Your password and confirm password don't match";
			isLoading = false;
			return;
		}
		message = '';

		// signing-up the user
		const userResults = await supabase.auth.signUp({ email, password });

		if (userResults.error) {
			message = userResults.error.message;
			console.error(userResults.error);
			isLoading = false;
			return;
		}

		// add full name to the settings table
		if (userResults.data.user?.id) {
			let settingsResults = await supabase
				.from('settings')
				.insert([{ myName: fullName, userId: userResults.data.user.id }]);

			if (settingsResults.error) {
				message = settingsResults.error.message;
				console.error(settingsResults.error);
				isLoading = false;
				return;
			}
		}

		isSignupFormShowing = false;
		isLoading = false;
	}
</script>

{#if isSignupFormShowing}
	<h1 class="auth-heading">Signup</h1>

	<Alert {message} />

	<form on:submit|preventDefault={handleSubmit}>
		<div class="field">
			<label for="fullName" class="text-goldenFizz">Full Name</label>
			<input
				type="text"
				name="fullName"
				id="fullName"
				required
				bind:value={fullName}
				disabled={isLoading}
			/>
		</div>

		<div class="field">
			<label for="email" class="text-goldenFizz">Email</label>
			<input
				type="email"
				name="email"
				id="email"
				required
				bind:value={email}
				disabled={isLoading}
			/>
		</div>

		<div class="field">
			<label for="password" class="text-goldenFizz">Password</label>
			<input
				type="password"
				name="password"
				id="password"
				required
				bind:value={password}
				disabled={isLoading}
			/>
		</div>

		<div class="field">
			<label for="confirmPassword" class="text-goldenFizz">Confirm Password</label>
			<input
				type="password"
				name="confirmPassword"
				id="confirmPassword"
				required
				bind:value={confirmPassword}
				disabled={isLoading}
			/>
		</div>

		<button type="submit" class="auth-button center gap-x-2" disabled={isLoading}>
			{#if isLoading}
				<Loader /> Loading
			{:else}
				Let's Go
			{/if}
		</button>

		<p class="mt-4 text-center text-sm text-white">
			<a href="/login" class="underline hover:no-underline">Already have an account?</a>
		</p>
	</form>
{:else}
	<Alert message="Check you email for the confirmation link" />
	<a href="/login" class="auth-button block text-center">Login</a>
{/if}
