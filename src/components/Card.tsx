import { createElement, FC, forwardRef, useCallback, useImperativeHandle, useLayoutEffect, useRef } from "react";

import { animateBack, animateOut, getSwipeDirection } from "../utils/card";
import {
	calcSpeed,
	dragableTouchmove,
	getTranslate,
	mouseCoordinatesFromEvent,
	normalize,
	settings,
	touchCoordinatesFromEvent,
} from "../utils/misc";
interface CardProps {
	flickOnSwipe?: boolean;
	children: React.ReactNode;
	onSwipe: any;
	onCardLeftScreen: any;
	className?: string;
	preventSwipe?: [any];
	swipeRequirementType?: string;
	swipeThreshold?: number;
	onSwipeRequirementFulfilled: any;
	onSwipeRequirementUnfulfilled: any;
}

const QuestionCard: FC<CardProps> = forwardRef(
	(
		{
			flickOnSwipe = true,
			children,
			onSwipe,
			onCardLeftScreen,
			className,
			preventSwipe = [],
			swipeRequirementType = "velocity",
			swipeThreshold = settings.swipeThreshold,
			onSwipeRequirementFulfilled,
			onSwipeRequirementUnfulfilled,
		},
		ref
	) => {
		settings.swipeThreshold = swipeThreshold;
		const swipeAlreadyReleased = useRef(false);

		const element = useRef() as any;

		useImperativeHandle(ref, () => ({
			async swipe(dir = "right") {
				if (onSwipe) onSwipe(dir);
				const power = 1000;
				const disturbance = (Math.random() - 0.5) * 100;
				if (dir === "right") {
					await animateOut(element.current, { x: power, y: disturbance }, true);
				} else if (dir === "left") {
					await animateOut(element.current, { x: -power, y: disturbance }, true);
				} else if (dir === "up") {
					await animateOut(element.current, { x: disturbance, y: power }, true);
				} else if (dir === "down") {
					await animateOut(element.current, { x: disturbance, y: -power }, true);
				}
				element.current.style.display = "none";
				if (onCardLeftScreen) onCardLeftScreen(dir);
			},
			async restoreCard() {
				element.current.style.display = "block";
				await animateBack(element.current);
			},
		}));

		const handleSwipeReleased = useCallback(
			async (element: HTMLElement, speed: { x: number; y: number }) => {
				if (swipeAlreadyReleased.current) {
					return;
				}
				swipeAlreadyReleased.current = true;

				const currentPostion = getTranslate(element);
				// Check if this is a swipe
				const dir = getSwipeDirection(swipeRequirementType === "velocity" ? speed : currentPostion);

				if (dir !== "none") {
					if (onSwipe) onSwipe(dir);

					if (flickOnSwipe) {
						if (!preventSwipe.includes(dir)) {
							const outVelocity = swipeRequirementType === "velocity" ? speed : normalize(currentPostion, 600);
							await animateOut(element, outVelocity);
							element.style.display = "none";
							if (onCardLeftScreen) onCardLeftScreen(dir);
							return;
						}
					}
				}

				// Card was not flicked away, animate back to start
				animateBack(element);
			},
			[swipeAlreadyReleased, flickOnSwipe, onSwipe, onCardLeftScreen, preventSwipe, swipeRequirementType]
		);

		const handleSwipeStart = useCallback(() => {
			swipeAlreadyReleased.current = false;
		}, [swipeAlreadyReleased]);

		useLayoutEffect(() => {
			let offset: any = { x: null, y: null };
			let speed = { x: 0, y: 0 };
			let lastLocation = { x: 0, y: 0, time: new Date().getTime() };
			let mouseIsClicked = false;
			let swipeThresholdFulfilledDirection = "none";

			element.current.addEventListener("touchstart", (ev: any) => {
				ev.preventDefault();
				handleSwipeStart();
				offset = { x: -touchCoordinatesFromEvent(ev).x, y: -touchCoordinatesFromEvent(ev).y };
			});

			element.current.addEventListener("mousedown", (ev: any) => {
				ev.preventDefault();
				mouseIsClicked = true;
				handleSwipeStart();
				offset = { x: -mouseCoordinatesFromEvent(ev).x, y: -mouseCoordinatesFromEvent(ev).y };
			});

			const handleMove = (coordinates: any) => {
				// Check fulfillment
				if (onSwipeRequirementFulfilled || onSwipeRequirementUnfulfilled) {
					const dir = getSwipeDirection(swipeRequirementType === "velocity" ? speed : getTranslate(element.current));
					if (dir !== swipeThresholdFulfilledDirection) {
						swipeThresholdFulfilledDirection = dir;
						if (swipeThresholdFulfilledDirection === "none") {
							if (onSwipeRequirementUnfulfilled) onSwipeRequirementUnfulfilled();
						} else {
							if (onSwipeRequirementFulfilled) onSwipeRequirementFulfilled(dir);
						}
					}
				}

				// Move
				const newLocation = dragableTouchmove(coordinates, element.current, offset, lastLocation);
				speed = calcSpeed(lastLocation, newLocation);
				lastLocation = newLocation;
			};

			element.current.addEventListener("touchmove", (ev: any) => {
				ev.preventDefault();
				handleMove(touchCoordinatesFromEvent(ev));
			});

			element.current.addEventListener("mousemove", (ev: any) => {
				ev.preventDefault();
				if (mouseIsClicked) {
					handleMove(mouseCoordinatesFromEvent(ev));
				}
			});

			element.current.addEventListener("touchend", (ev: any) => {
				ev.preventDefault();
				handleSwipeReleased(element.current, speed);
			});

			element.current.addEventListener("mouseup", (ev: any) => {
				if (mouseIsClicked) {
					ev.preventDefault();
					mouseIsClicked = false;
					handleSwipeReleased(element.current, speed);
				}
			});

			element.current.addEventListener("mouseleave", (ev: any) => {
				if (mouseIsClicked) {
					ev.preventDefault();
					mouseIsClicked = false;
					handleSwipeReleased(element.current, speed);
				}
			});
		}, []); // TODO fix so swipeRequirementType can be changed on the fly. Pass as dependency cleanup eventlisteners and update new eventlisteners.

		return createElement("div", { ref: element, className }, children);
	}
);

export default QuestionCard;
