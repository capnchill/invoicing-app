// Reference
// https://github.com/sveltejs/language-tools/blob/master/docs/preprocessors/typescript.md#im-using-an-attributeevent-on-a-dom-element-and-it-throws-a-type-error

declare namespace svelteHTML {
	// enhance attributes
	interface HTMLAttributes<HTMLDivElements> {
		// If you want to use on:beforeinstallprompt
		'on:outofview'?: (event) => void;
		// If you want to use myCustomAttribute={..} (note: all lowercase)
	}
}
