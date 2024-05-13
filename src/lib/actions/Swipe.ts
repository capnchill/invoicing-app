import { spring } from 'svelte/motion';

type SwipeProps = {
	triggerReset?: boolean;
};

export function swipe(node: HTMLElement, params: SwipeProps) {
	let x: number;
	let startingX: number;
	const elementWidth = node.clientWidth;
	let triggerReset = params.triggerReset || false;

	const coordinates = spring({ x: 0, y: 0 }, { stiffness: 0.2, damping: 0.4 });

	coordinates.subscribe((coords) => {
		node.style.transform = `translate3d(${coords.x}px, 0, 0)`;
	});

	node.addEventListener('mousedown', handleMouseDown);

	function handleMouseDown(event: MouseEvent) {
		startingX = event.clientX;
		console.log(startingX);
		x = event.clientX;
		window.addEventListener('mousemove', handleMouseMove);
		window.addEventListener('mouseup', handleMouseUp);
	}

	function handleMouseMove(event: MouseEvent) {
		// delta x is the difference from where we clicked to where we are currently
		const dx = event.clientX - x;
		x = event.clientX;

		coordinates.update((coords) => {
			return { x: coords.x + dx, y: 0 };
		});
	}

	function updateCoordindates(x: number) {
		coordinates.update(() => {
			return { x, y: 0 };
		});
	}

	function moveCardOver(endingX: number) {
		const leftSnapX = elementWidth * -0.95;
		const rightSnapX = 0;

		const movement = startingX - endingX;

		if (movement > 20) {
			// swiped left
			x = leftSnapX;
			outOfView();
		} else {
			// swiped right
			x = rightSnapX;
			backInView();
		}
		updateCoordindates(x);
	}

	function handleMouseUp(event: MouseEvent) {
		const endingX = event.clientX;

		moveCardOver(endingX);

		window.removeEventListener('mousemove', handleMouseMove);
		window.removeEventListener('mouseup', handleMouseUp);
	}

	function resetCard() {
		coordinates.update(() => {
			return { x: 0, y: 0 };
		});
		triggerReset = false;
	}

	function outofview() {
		node.dispatchEvent(new CustomEvent('outOfView'));
	}

	function backInView() {
		node.dispatchEvent(new CustomEvent('backInView'));
	}

	return {
		update(newParams: SwipeProps) {
			// the code inside update runs whenever the parameters update or change
			if (newParams.triggerReset) {
				resetCard();
			}
		},
		destroy() {
			node.removeEventListener('mousedown', handleMouseDown);
		}
	};
}
