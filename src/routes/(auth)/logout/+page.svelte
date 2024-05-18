<script lang="ts">
	import { goto } from '$app/navigation';
	import supabase from '$lib/utils/supabase';
	import { onMount } from 'svelte';

	export let data;

	onMount(async () => {
		console.log('trying to logout');

		// const { error } = await data.supabase.auth.signOut();

		const { error } = await supabase.auth.signOut();

		if (error) {
			console.error(error);
		}

		goto('/login');
	});
</script>
