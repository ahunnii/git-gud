import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import React, { useEffect, useMemo, useRef, useState } from "react";
// import TinderCard from '../react-tinder-card/index '\
import {
	Button,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	useDisclosure,
} from "@chakra-ui/react";

import { MdCheckCircle, MdOutlineCancel, MdUndo } from "react-icons/md";

import db from "../public/data/javascript.json";
import "./App.css";
import Answer from "./components/Answer";
import QuestionCard from "./components/Card";

function Advanced() {
	const [currentIndex, setCurrentIndex] = useState(db.length - 1);
	const [lastDirection, setLastDirection] = useState();
	// used for outOfFrame closure
	const currentIndexRef = useRef(currentIndex);

	const childRefs = useMemo(
		() =>
			Array(db.length)
				.fill(0)
				.map((i) => React.createRef()),
		[]
	) as any[];

	const updateCurrentIndex = (val: number) => {
		setCurrentIndex(val);
		currentIndexRef.current = val;
	};

	const canGoBack = currentIndex < db.length - 1;

	const canSwipe = currentIndex >= 0;

	// set last direction and decrease current index
	const swiped = (direction: any, nameToDelete: string, index: number) => {
		setLastDirection(direction);
		updateCurrentIndex(index - 1);
	};

	const outOfFrame = (name: string, idx: any) => {
		console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current);
		// handle the case in which go back is pressed before card goes outOfFrame
		currentIndexRef.current >= idx && childRefs[idx].current.restoreCard();
		// TODO: when quickly swipe and restore multiple times the same card,
		// it happens multiple outOfFrame events are queued and the card disappear
		// during latest swipes. Only the last outOfFrame event should be considered valid
	};

	const swipe = async (dir: string) => {
		if (canSwipe && currentIndex < db.length) {
			await childRefs[currentIndex].current.swipe(dir); // Swipe the card!
		}
	};

	// increase current index and show card
	const goBack = async () => {
		if (!canGoBack) return;
		const newIndex = currentIndex + 1;
		updateCurrentIndex(newIndex);
		await childRefs[newIndex].current.restoreCard();
	};

	return (
		<div className="app fallout">
			<Box className="">
				<Box
					className="piece output"
					flexDir={"column"}
					justifyContent={{ base: "flex-start", md: "center" }}
					w="100vw"
					display={"inline-flex"}>
					<Heading my={2}>Git Gud</Heading>
					<Box className="cardContainer" w="100%" mx="auto">
						{db.map((character, index) => (
							<QuestionCard
								ref={childRefs[index]}
								className="swipe"
								key={character.question}
								onSwipe={(dir: any) => swiped(dir, character.question, index)}
								onCardLeftScreen={() => outOfFrame(character.question, index)}>
								<Box className="card" shadow={"base"} p={5} h={"300px"}>
									<h3>{character.question}</h3>
									<Answer question={character.question} answer={character.answer} />
								</Box>
							</QuestionCard>
						))}
					</Box>
					<Flex w="300px" justifyContent={"space-around"} mx="auto" my={5}>
						<Button
							onClick={() => swipe("left")}
							display={"flex"}
							variant="ghost"
							_hover={{
								backgroundColor: "#152e08",
							}}>
							<MdOutlineCancel />
						</Button>

						<Button
							onClick={() => goBack()}
							variant="ghost"
							_hover={{
								backgroundColor: "#152e08",
							}}
							disabled={!canGoBack}>
							<MdUndo />
						</Button>
						<Button
							onClick={() => swipe("right")}
							variant="ghost"
							_hover={{
								backgroundColor: "#152e08",
							}}>
							<MdCheckCircle />
						</Button>
					</Flex>{" "}
					{lastDirection ? (
						<h2 key={lastDirection} className="infoText">
							{lastDirection == "left" ? "You still don't know it..." : "You kind of know it!"}
						</h2>
					) : (
						<h2 className="infoText">Swipe a card or press a button to get Restore Card button visible!</h2>
					)}
				</Box>
			</Box>
		</div>
	);
}

export default Advanced;
