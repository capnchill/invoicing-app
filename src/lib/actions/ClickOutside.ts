export function clickOutside(node: HTMLElement, runFunction: () => void) {
	function handleClick(event: MouseEvent) {
		if (!node.contains(event.target as HTMLElement)) {
			if (runFunction) runFunction();
		}
	}

	document.addEventListener('click', handleClick, true);

	return {
		destroy() {
			document.removeEventListener('click', handleClick, true);
		}
	};
}
