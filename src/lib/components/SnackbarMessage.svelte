<script lang="ts">
	import { snackbar } from '$lib/stores/SnackbarStore';
	import { onMount } from 'svelte';
	import { tweened } from 'svelte/motion';

	// similar effect could have also been achieved by using setTimeout of 3000ms from the time when the snackbar is created
	let progress = tweened(100, {
		duration: 3000
	});

	export let message: string = '';

	onMount(async () => {
		await progress.set(0);
		snackbar.remove();
	});
</script>

<!-- white space nowrap so that the entire message appears in one line
and does not break into two -->
<div class="whitespace-nowrap">
	{message}
</div>
