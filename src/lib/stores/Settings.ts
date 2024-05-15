import { writable } from 'svelte/store';
import supabase from '$lib/utils/supabase';

export const settings = writable<Settings>();

export async function loadSettings() {
	const { data, error } = await supabase.from('settings').select('*');

	if (error) {
		console.error(error);
		return;
	}

	settings.set(data[0]);
}
