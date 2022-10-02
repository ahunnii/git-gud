import { Box, Code, Flex, Heading, ListItem, Stack, Text, UnorderedList } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import "./styles.scss";

export const Perk = () => {
	//     var level = document.getElementById('level');
	// var levelCap = parseInt(level.getAttribute('data-level-cap'));
	// var curLevel = parseInt(level.getAttribute('data-level-current'));

	// for(var i = 1; i <= levelCap; i++) {
	//   if(curLevel >= i) {
	//     level.innerHTML += '<div class="star current-level"></div>';
	//   }
	//   else {
	//     level.innerHTML += '<div class="star"></div>';
	//   }
	// }
	const [level, setLevel] = useState<any>(1);
	const [levelCap, setLevelCap] = useState<any>(3);
	const [stars, setStars] = useState<any>(null);
	const Stars = () => {
		const arr = [];
		for (let i = 1; i <= levelCap; i++) {
			if (level >= i) {
				arr.push(<div className="star current-level"></div>);
			} else {
				arr.push(<div className="star"></div>);
			}
		}

		return arr;
	};

	useEffect(() => {
		setStars(() => Stars());
	}, []);
	const [isFlipped, setIsFlipped] = useState<any>(false);
	const [isFlipping, setIsFlipping] = useState<any>(false);

	const handleOnClick = (e: any) => {
		e.stopPropagation();

		if (isFlipped) {
			setIsFlipping(true);
			setTimeout(function () {
				setIsFlipped(false);
				setIsFlipping(false);
			}, 500);
		} else {
			setIsFlipped(true);
		}
	};

	return (
		<Box className="card-scene">
			<div
				id="card"
				className={`card  ${isFlipped ? "card--flipped" : ""} ${isFlipping ? "card--unflip" : ""}`}
				onClick={handleOnClick}>
				<div className="card-face card-backing">
					<div className="grain-overlay"></div>
					<div className="bump"></div>
					<div className="top-banner"></div>
					<div className="back-main">
						<div className="pipboy">
							{/* <div className="twelve-point-star"></div> */}

							<img
								src="https://vignette.wikia.nocookie.net/fallout/images/c/c0/VaultBoyFO3.png/revision/latest?cb=20110809182235"
								alt=""
								hidden
							/>
						</div>
						<Text fontSize={"3em"} fontWeight={700} color={"gray.800"}>
							What are the ways to create an object in JS?{" "}
						</Text>
						<div className="vault-tec">
							<div className="center"></div>
							<div className="lines">
								<div className="line line--left">
									<div className="line-inner"></div>
									<div className="line-inner"></div>
									<div className="line-inner"></div>
								</div>
								<div className="line line--right">
									<div className="line-inner"></div>
									<div className="line-inner"></div>
									<div className="line-inner"></div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="card-face card-front">
					<h1>
						<span className="bump">
							<b className="outer">
								<b className="inner">1</b>
							</b>
						</span>
						Answer
					</h1>{" "}
					<div className="main-pane">
						{/* <img
							className="slugger"
							alt=""
							src="https://vignette.wikia.nocookie.net/fallout/images/6/69/Fo76_Slugger.png/revision/latest/scale-to-width-down/353?cb=20181125171021"
						/> */}
						<Flex h={"65%"} flexDir={"column"} pt={"2rem"} overflowY={"scroll"}>
							<Heading>Object constructor:</Heading>
							<Text fontSize={"1.5rem"}>
								The simplest way to create an empty object is using the Object constructor. Currently this approach is
								not recommended.
							</Text>
							<Code children="var object = new Object();" />

							<Heading>Object's create method:</Heading>
							<Text>
								The create method of Object creates a new object by passing the prototype object as a parameter
							</Text>
							<Code children="var object = Object.create(null);" />

							<Heading>Object literal syntax:</Heading>
							<Text fontSize={"1.5rem"}>
								The object literal syntax (or object initializer), is a comma-separated set of name-value pairs wrapped
								in curly braces.
							</Text>
							<Code children={`var object = { name: "Sudheer",age: 34};`} />
							<Code children="Object literal property values can be of any data type, including array, function, and nested object."></Code>
							<Heading>Function constructor:</Heading>
							<Text>Create any function and apply the new operator to create object instances,</Text>

							<Flex flexDir={"column"} textAlign={"left"} mx={"auto"} w={"75%"}>
								<Code children="function Person(name) {" />
								<Code children="&nbsp;this.name = name;" />
								<Code children="&nbsp;this.age = 21;" />
								<Code children="}" />

								<Code children="var object = new Person('Sudheer');" />
							</Flex>

							<Heading>Function constructor with prototype:</Heading>
							<Text fontSize={"1.5rem"}>
								This is similar to function constructor but it uses prototype for their properties and methods,
							</Text>
							<Flex flexDir={"column"} textAlign={"left"} mx={"auto"} w={"75%"}>
								<Code children="function Person() {}" />
								<Code children="Person.prototype.name = `Sudheer`;" />
								<Code children="var object = new Person();" />
							</Flex>

							<Text fontSize={"1.5rem"}>
								This is equivalent to an instance created with an object create method with a function prototype and
								then call that function with an instance and parameters as arguments.
							</Text>

							<Flex flexDir={"column"} textAlign={"left"} mx={"auto"} w={"75%"}>
								<Code children="function func() {};" />
								<Code children="new func(x, y, z);" />
							</Flex>
							<Text>Or</Text>

							<Flex flexDir={"column"} textAlign={"left"} mx={"auto"} w={"75%"}>
								<Code children="// Create a new instance using function prototype." />
								<Code children="var newInstance = Object.create(func.prototype)" />
								<Code children="// Call the function" />
								<Code children="var result = func.call(newInstance, x, y, z);" />
								<Code children="// If the result is a non-null object then use it otherwise just use the new instance." />
								<Code children="console.log(result && typeof result === 'object' ? result : newInstance);" />
								<Code children="var object = Object.create(null);" />
							</Flex>
							<Heading> ES6 Class syntax:</Heading>
							<Text fontSize={"1.5rem"}>ES6 introduces class feature to create the objects</Text>
							<Flex flexDir={"column"} textAlign={"left"} mx={"auto"} w={"75%"}>
								<Code children="class Person {" />
								<Code children="constructor(name) {" />
								<Code children=" this.name = name;" />
								<Code children="}" />
								<Code children="}" />
								<Code children="var object = new Person(`Andrew`);" />
							</Flex>

							<Heading> Singleton pattern:</Heading>
							<Text fontSize={"1.5rem"}>
								A Singleton is an object which can only be instantiated one time. Repeated calls to its constructor
								return the same instance and this way one can ensure that they don't accidentally create multiple
								instances.
							</Text>
							<Flex flexDir={"column"} textAlign={"left"} mx={"auto"} w={"75%"}>
								<Code children="var object = new (function () {" />
								<Code children="this.name = 'Andrew';" />
								<Code children="})();" />
							</Flex>
						</Flex>
					</div>
					<div className="desc">
						<Text fontSize={"1.5rem"}>As long as you have 3, you should be good</Text>
						<Box className="special" data-category="strength">
							S
						</Box>
						<div id="level" className="level" data-level-cap="3" data-level-current={"1"}>
							{stars}
						</div>
					</div>
					{/* <div className="grain-overlay"></div> */}
				</div>
			</div>
		</Box>
	);
};
