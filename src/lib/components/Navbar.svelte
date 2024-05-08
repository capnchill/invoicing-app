<script lang="ts">
	import { page } from '$app/stores';
	import Close from '$lib/components/Icon/Close.svelte';
	import Hamburger from './Icon/Hamburger.svelte';

	let isNavShowing = false;
</script>

<!-- sveltehead added to lock down scrolling -->
<svelte:head>
	{#if isNavShowing}
		<style lang="postcss">
			body {
				@apply overflow-hidden md:overflow-auto;
			}
		</style>
	{/if}
</svelte:head>

<button
	class="fixed right-6 top-6 z-navBarToggle md:hidden"
	class:text-goldenFizz={isNavShowing}
	class:text-daisyBush={!isNavShowing}
	on:click={() => {
		isNavShowing = !isNavShowing;
	}}
>
	{#if isNavShowing}
		<Close height={32} width={32} />
	{:else}
		<Hamburger height={32} width={32} />
	{/if}
</button>

<header
	class="fixed z-navBar h-screen w-full -translate-x-full bg-daisyBush text-center transition-transform md:relative md:col-span-3 md:h-full md:translate-x-0"
	class:translate-x-0={isNavShowing}
>
	<div class=" my-10 md:mb-24">
		<a href="/invoices"><img src="/images/logo.svg" alt="logo" class="mx-auto" /></a>
	</div>

	<nav>
		<ul class="flex flex-col gap-2 text-2xl font-bold">
			<li><a href="/invoices" class:active={$page.url.pathname === '/invoices'}>Invoices</a></li>
			<li><a href="/clients" class:active={$page.url.pathname === '/clients'}>Clients</a></li>
			<li><a href="/">Settings</a></li>
			<li><a href="/">Logout</a></li>
		</ul>
	</nav>
</header>

<style lang="postcss">
	nav ul li {
		@apply mb-6;
	}

	nav ul li a {
		@apply font-bold text-white hover:text-goldenFizz;
	}

	nav ul li a.active {
		@apply px-8 text-robinEggBlue transition-[padding];
		background:
			url('/images/active-nav--left.svg') left top no-repeat,
			url('/images/active-nav--right.svg') right top no-repeat;
	}

	nav ul li a:hover {
		@apply px-9;
	}
</style>
