<script lang="ts">
	import '../app.css';

	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import supabase from '$lib/utils/supabase';

	onMount(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange(() => {
			invalidate('supabase:auth');
		});

		// const {
		// 	data: { subscription }
		// } = supabase.auth.onAuthStateChange(async () => {
		// 	const {
		// 		data: { user: authUser }
		// 	} = await supabase.auth.getUser();
		// 	user = authUser;
		// 	invalidate('supabase:auth');
		// });

		return () => {
			subscription.unsubscribe();
		};
	});
</script>

<slot />
