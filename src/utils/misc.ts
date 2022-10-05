const settings = {
	snapBackDuration: 300,
	maxTilt: 5,
	bouncePower: 0.2,
	swipeThreshold: 300, // px/s
};

const getElementSize = (element: HTMLElement) => {
	const elementStyles = window.getComputedStyle(element);
	const widthString = elementStyles.getPropertyValue("width");
	const width = Number(widthString.split("px")[0]);
	const heightString = elementStyles.getPropertyValue("height");
	const height = Number(heightString.split("px")[0]);
	return { x: width, y: height };
};

const pythagoras = (x: number, y: number) => {
	return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
};

const normalize = (vector: { x: number; y: number }, multiplier = 1) => {
	const length = Math.sqrt(Math.pow(vector.x, 2) + Math.pow(vector.y, 2));
	return { x: (vector.x * multiplier) / length, y: (vector.y * multiplier) / length };
};

const calcSpeed = (
	oldLocation: { x: number; y: number; time: any },
	newLocation: { x: number; y: number; time: any }
) => {
	const dx = newLocation.x - oldLocation.x;
	const dy = oldLocation.y - newLocation.y;
	const dt = (newLocation.time - oldLocation.time) / 1000;
	return { x: dx / dt, y: dy / dt };
};

const translationString = (x: number, y: number) => {
	const translation = "translate(" + x + "px, " + y + "px)";
	return translation;
};

const rotationString = (rot: number) => {
	const rotation = "rotate(" + rot + "deg)";
	return rotation;
};

const getTranslate = (element: HTMLElement) => {
	const style = window.getComputedStyle(element);
	const matrix = new WebKitCSSMatrix(style.webkitTransform);
	const ans = { x: matrix.m41, y: -matrix.m42 };
	return ans;
};

const getRotation = (element: HTMLElement) => {
	const style = window.getComputedStyle(element);
	const matrix = new WebKitCSSMatrix(style.webkitTransform);
	const ans = (-Math.asin(matrix.m21) / (2 * Math.PI)) * 360;
	return ans;
};

const dragableTouchmove = (
	coordinates: { x: number; y: number },
	element: HTMLElement,
	offset: { x: number; y: number },
	lastLocation: { x: number; y: number; time: any }
) => {
	const pos = { x: coordinates.x + offset.x, y: coordinates.y + offset.y };
	const newLocation = { x: pos.x, y: pos.y, time: new Date().getTime() };
	const translation = translationString(pos.x, pos.y);
	const rotCalc = calcSpeed(lastLocation, newLocation).x / 1000;
	const rotation = rotationString(rotCalc * settings.maxTilt);
	element.style.transform = translation + rotation;
	return newLocation;
};

const touchCoordinatesFromEvent = (e: any) => {
	const touchLocation = e.targetTouches[0];
	return { x: touchLocation.clientX, y: touchLocation.clientY };
};

const mouseCoordinatesFromEvent = (e: any) => {
	return { x: e.clientX, y: e.clientY };
};

export {
	settings,
	getElementSize,
	pythagoras,
	normalize,
	getTranslate,
	getRotation,
	dragableTouchmove,
	translationString,
	rotationString,
	touchCoordinatesFromEvent,
	mouseCoordinatesFromEvent,
	calcSpeed,
};
