<script lang="ts">
	import { page } from '$app/stores';
</script>

<svelte:head>
	<title>Not Found</title>
</svelte:head>

<div class="center bg-error h-screen w-screen flex-col bg-center bg-no-repeat">
	<h1 class="text-center text-[10rem] font-bold leading-none text-daisyBush">{$page.status}</h1>
	<div>
		<p class="text-center text-2xl font-black text-daisyBush">Sorry!</p>
		<p class="text-daisyBush">{$page.error?.message || 'Not Found'}</p>
	</div>
</div>
