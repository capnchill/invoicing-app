import { spring } from 'svelte/motion';

type SwipeProps = {};

export function swipe(node: HTMLElement, params: SwipeProps = {}) {
	let x: number;
	let startingX: number;
	const elementWidth = node.clientWidth;

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

		// swiped left
		if (movement > 20) {
			x = leftSnapX;
			updateCoordindates(x);
		}

		// swiped right
		if (movement < 20) {
			x = rightSnapX;
			updateCoordindates(x);
		}
	}

	function handleMouseUp(event: MouseEvent) {
		const endingX = event.clientX;

		moveCardOver(endingX);

		window.removeEventListener('mousemove', handleMouseMove);
		window.removeEventListener('mouseup', handleMouseUp);
	}

	return {
		update() {},
		destroy() {
			node.removeEventListener('mousedown', handleMouseDown);
		}
	};
}
