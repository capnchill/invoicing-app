import { snackbar } from '../stores/SnackbarStore';

export function displayErrorMessage(error: Error) {
	console.error(error);
	snackbar.send({
		message: error.message,
		type: 'error'
	});
}
