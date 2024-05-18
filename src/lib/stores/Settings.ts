import { writable } from 'svelte/store';
import supabase from '$lib/utils/supabase';
import { displayErrorMessage } from '$lib/utils/handleError';
import { snackbar } from './SnackbarStore';

export const settings = writable<Settings>();

export async function loadSettings() {
	const { data, error } = await supabase.from('settings').select('*').single();

	if (error) {
		console.error(error);
		return;
	}

	settings.set(data);
}

export async function updateSettings(newSettings: Settings) {
	const { error } = await supabase.from('settings').update(newSettings).eq('id', newSettings.id);

	if (error) {
		displayErrorMessage(error as Error);
		return;
	}

	snackbar.send({
		message: 'settings were successfully updated',
		type: 'success'
	});

	settings.update(() => newSettings);
}
