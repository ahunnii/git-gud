import sleep from "p-sleep";

import {
	getElementSize,
	getRotation,
	getTranslate,
	pythagoras,
	rotationString,
	settings,
	translationString,
} from "./misc";

const animateOut = async (element: HTMLElement, speed: { x: number; y: number }, easeIn: boolean = false) => {
	const startPos = getTranslate(element);
	const bodySize = getElementSize(document.body);
	const diagonal = pythagoras(bodySize.x, bodySize.y);

	const velocity = pythagoras(speed.x, speed.y);
	const time = diagonal / velocity;
	const multiplier = diagonal / velocity;

	const translateString = translationString(speed.x * multiplier + startPos.x, -speed.y * multiplier + startPos.y);
	let rotateString = "";

	const rotationPower = 200;

	if (easeIn) {
		element.style.transition = "ease " + time + "s";
	} else {
		element.style.transition = "ease-out " + time + "s";
	}

	if (getRotation(element) === 0) {
		rotateString = rotationString((Math.random() - 0.5) * rotationPower);
	} else if (getRotation(element) > 0) {
		rotateString = rotationString((Math.random() * rotationPower) / 2 + getRotation(element));
	} else {
		rotateString = rotationString(((Math.random() - 1) * rotationPower) / 2 + getRotation(element));
	}

	element.style.transform = translateString + rotateString;

	await sleep(time * 1000);
};

const animateBack = async (element: HTMLElement) => {
	element.style.transition = settings.snapBackDuration + "ms";
	const startingPoint = getTranslate(element);
	const translation = translationString(
		startingPoint.x * -settings.bouncePower,
		startingPoint.y * -settings.bouncePower
	);
	const rotation = rotationString(getRotation(element) * -settings.bouncePower);
	element.style.transform = translation + rotation;

	await sleep(settings.snapBackDuration * 0.75);
	element.style.transform = "none";

	await sleep(settings.snapBackDuration);
	element.style.transition = "10ms";
};
const getSwipeDirection = (property: { x: number; y: number }) => {
	if (Math.abs(property.x) > Math.abs(property.y)) {
		if (property.x > settings.swipeThreshold) {
			return "right";
		} else if (property.x < -settings.swipeThreshold) {
			return "left";
		}
	} else {
		if (property.y > settings.swipeThreshold) {
			return "up";
		} else if (property.y < -settings.swipeThreshold) {
			return "down";
		}
	}
	return "none";
};

export { animateOut, animateBack, getSwipeDirection };
