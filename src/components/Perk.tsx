import { ListItem, Text, UnorderedList } from "@chakra-ui/react";
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
		<div className="card-scene">
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
						<Text fontSize={"3em"}>What are the ways to create an object in JS? </Text>
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
						Slugger
					</h1>{" "}
					<UnorderedList className="slugger" h={"100%"}>
						<ListItem>Object Constructor</ListItem>
						<ListItem>Object Constructor</ListItem>
						<ListItem>Object Constructor</ListItem>
						<ListItem>Object Constructor</ListItem>
						<ListItem>Object Constructor</ListItem>
						<ListItem>Object Constructor</ListItem>
					</UnorderedList>
					<div className="main-pane">
						{/* <img
							className="slugger"
							alt=""
							src="https://vignette.wikia.nocookie.net/fallout/images/6/69/Fo76_Slugger.png/revision/latest/scale-to-width-down/353?cb=20181125171021"
						/> */}
					</div>
					<div className="desc">
						<p>Your two-handed melee weapons now do +10% damage.</p>
						<div className="special" data-category="strength">
							S
						</div>
						<div id="level" className="level" data-level-cap="3" data-level-current={"1"}>
							{stars}
						</div>
					</div>
					<div className="grain-overlay"></div>
				</div>
			</div>
		</div>
	);
};
