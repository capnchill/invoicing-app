<script lang="ts">
	let email: string, password: string;
</script>

<h1 class="mb-4 text-[2.5rem] font-bold text-goldenFizz">Login</h1>

<form>
	<div class="field">
		<label for="email" class="text-goldenFizz">Email</label>
		<input type="text" name="email" id="email" bind:value={email} />
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
		/>
	</div>

	<div class="field">
		<button
			class="mt-6 min-h-[3.5rem] w-full rounded-lg bg-robinEggBlue py-3 text-xl font-bold text-daisyBush transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
			type="submit">Login</button
		>
		<p class="mt-4 text-center text-sm text-white">
			<a href="/signup" class="underline hover:no-underline"> Don't have an account yet? </a>
		</p>
	</div>
</form>
