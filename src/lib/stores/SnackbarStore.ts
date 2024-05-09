import { writable } from 'svelte/store';
import { v4 as uuidv4 } from 'uuid';

// When you write $snackbar, Svelte automatically calls the subscribe method of the store and sets up reactivity,
// so that whenever the store value changes, the component will automatically re-render with the new value.

// to call the store methods/functions like remove or send, you need to access them directly on the store object
// (snackbar.remove(id) or snackbar.send(content)).

function newSnackbar() {
	// this is an alternate way to work with stores, a different way is adopted in client and invoice store
	const { update, subscribe } = writable<Snackbar[]>([]);

	function send(content: { message: string; type: NotificationType }) {
		const newContent = { id: uuidv4(), ...content };

		update((store) => {
			return [...store, newContent];
			// here we are returning a new array by copying existing array into a new one and appending the newContent to it
			// store.push(newContent) is not used becuase the updater function inside update() expects a new store array
			// push would have mutated the original array,
		});
	}

	function remove(id: string | null = null) {
		// If you want to ensure that a function is not called with an object context, you can use the this: void syntax in the function's type signature
		update((store) => {
			if (id) {
				return store.filter((item) => item.id !== id);
			} else {
				const [, ...rest] = store;
				return [...rest];
			}
		});
	}

	return { subscribe, send, remove };
}

export const snackbar = newSnackbar();
