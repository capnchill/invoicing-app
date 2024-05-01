<div class="grid min-h-screen grid-cols-12 gap-x-16 bg-whisper">
	<header class="col-span-3 bg-daisyBush text-center">
		<a href="/invoices"><img src="/images/logo.svg" alt="logo" class="mx-auto my-16" /></a>
		<nav>
			<ul class="flex flex-col gap-2 text-2xl font-bold">
				<li><a href="/invoices">Invoices</a></li>
				<li><a href="/clients">Clients</a></li>
				<li><a href="/">Settings</a></li>
				<li><a href="/">Logout</a></li>
			</ul>
		</nav>
	</header>
	<main class="col-span-8 pt-10">
		<slot />
	</main>
</div>

<style lang="postcss">
	nav ul li {
		@apply mb-6;
	}

	nav ul li {
		@apply font-bold text-white hover:text-goldenFizz;
	}
</style>
