import styled from "@emotion/styled";
import { motion } from "framer-motion";
import React, { Children, FC, useState } from "react";

import { Card } from "./Card";

interface StackProps {
	children?: React.ReactNode;
	onVote: any;
}

const Frame = styled.div`
	width: 100%;
	overflow: hidden;
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
`;

export const Stack: FC<StackProps> = ({ onVote, children, ...props }) => {
	const [stack, setStack] = useState<any>(Children.toArray(children));

	// return new array with last item removed
	const pop = (array: any) => {
		return array.filter((_: any, index: any) => {
			return index < array.length - 1;
		});
	};

	const handleVote = (item: any, vote: any) => {
		// update the stack
		let newStack = pop(stack);
		setStack(newStack);

		// run function from onVote prop, passing the current item and value of vote
		onVote(item, vote);
	};

	return (
		<>
			<Frame {...props}>
				{stack.map((item: any, index: any) => {
					let isTop = index === stack.length - 1;
					return (
						<Card
							drag={isTop} // Only top card is draggable
							key={item.key || index}
							onVote={(result: any) => handleVote(item, result)}>
							{item}
						</Card>
					);
				})}
			</Frame>
		</>
	);
};
