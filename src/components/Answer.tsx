import {
	Box,
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
import ChakraUIRenderer from "chakra-ui-markdown-renderer";
import { FC, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

interface AnswerProps {
	question: string;
	answer: string;
}
const Answer: FC<AnswerProps> = ({ question, answer }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [text, setText] = useState("");

	useEffect(() => {
		fetch("./data/" + answer)
			.then((response) => response.text())
			.then((text: any) => {
				setText(text);
			})
			.catch((error) => {
				console.error(error);
			});
	}, []);

	return (
		<>
			<Button
				onClick={onOpen}
				onTouchEnd={onOpen}
				variant="outline"
				mt={5}
				borderColor={"rgb(0, 230,50)"}
				_hover={{
					backgroundColor: "#152e08",
				}}>
				Reveal the Answer
			</Button>

			<Modal onClose={onClose} isOpen={isOpen} size={"full"} scrollBehavior={"inside"} isCentered>
				<ModalOverlay />
				<ModalContent
					className="piece output"
					bg={"black"}
					color={"rgb(var(--main))"}
					fontFamily={"Roboto Mono, monospace"}
					py={10}>
					<ModalHeader>{question}</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<ReactMarkdown components={ChakraUIRenderer()} children={text} skipHtml />
						<Box className="piece glow noclick" zIndex={"-1"}></Box>
					</ModalBody>
					<ModalFooter>
						<Button onClick={onClose} variant="ghost">
							Close
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export default Answer;
