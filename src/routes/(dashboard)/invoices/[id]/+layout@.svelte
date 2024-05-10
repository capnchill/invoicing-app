<script lang="ts">
	import Arrow from '$lib/components/Icon/Arrow.svelte';

	import { afterNavigate, goto } from '$app/navigation';

	let previousPage: string | undefined;

	//  previousPage will be set to undefined, if we directly enter the url
	// if this page was navigated to from another page, then the previousPage var is set to the path of that page
	afterNavigate((navigation) => {
		previousPage = navigation.from?.url.pathname;
	});
</script>

<svelte:window
	on:keydown={(event) => {
		if (event.key === 'Escape') {
			goto(previousPage || '/invoices');
		}
	}}
/>

<div class="h-full min-h-screen w-screen bg-whisper pb-32 pt-16 lg:pt-12">
	<main class="mx-auto min-h-screen max-w-screen-lg">
		<a href={previousPage ? previousPage : '/invoices'} class="fixed left-7 top-7 text-pastelPurple"
			><Arrow /></a
		>
		<slot></slot>
	</main>
</div>
