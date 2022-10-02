import { Box, Heading } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { motion, useAnimation, useMotionValue } from "framer-motion";
import { FC, useState } from "react";
import "./App.css";
import reactLogo from "./assets/react.svg";
import { Perk } from "./components/Perk";
import { Stack } from "./components/Stack";

function App() {
	const Wrapper = styled(Stack)`
		background: #1f2937;
		height: 100%;
	`;

	const Item = styled(motion.div)`
		background: #f9fafb;
		width: 200px;
		height: 250px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 80px;
		text-shadow: 0 10px 10px #d1d5db;
		box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
		border-radius: 8px;
		transform: ${() => {
			let rotation = Math.random() * (5 - -5) + -5;
			return `rotate(${rotation}deg)`;
		}};
	`;

	return (
		<Box as={"main"}>
			<Heading textAlign={"center"}>Git Gud</Heading>
			{/* <Wrapper onVote={(item: any, vote: any) => console.log(item.props, vote)}>
				<Item data-value="waffles" whileTap={{ scale: 1.15 }}>
					🧇
				</Item>
				<Item data-value="pancakes" whileTap={{ scale: 1.15 }}>
					🥞
				</Item>
				<Item data-value="donuts" whileTap={{ scale: 1.15 }}>
					🍩
				</Item>
			</Wrapper> */}
			{/* <Flashcards /> */}
			<Perk />
		</Box>
	);
}

export default App;
