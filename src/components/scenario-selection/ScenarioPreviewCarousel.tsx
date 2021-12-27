import "pure-react-carousel/dist/react-carousel.es.css";
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from "pure-react-carousel";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import React, { useEffect, useState } from "react";
import ScenarioType from "../../types/Game/ScenarioType";
import { Typography } from "@mui/material";
import ScenarioPreviewCard from "./ScenarioPreviewCard";

interface ScenarioPreviewCarouselProps {
	scenarios: ScenarioType[];
	callbackSelectScenario: any;
	currentSlide: number;
	scenarioPerIndex: Map<number, ScenarioType>;
}



const ScenarioPreviewCarousel = (props: ScenarioPreviewCarouselProps) => {
	const [indexInCarousel, setIndexInCarousel] = useState<number>(0);

	useEffect(() => {
		props.scenarios.map((scenario, ind) => {
			props.scenarioPerIndex.set(ind, scenario);
		});

		props.callbackSelectScenario(props.scenarioPerIndex.get(0));
	}, [props.scenarios]);

	useEffect(() => {
		props.callbackSelectScenario(props.scenarioPerIndex.get(indexInCarousel));
	}, [indexInCarousel]);


	const handleOnClickBack = () => {
		indexInCarousel - 1 < 0 ? setIndexInCarousel(props.scenarios.length - 1) : setIndexInCarousel(indexInCarousel - 1);
	};

	const handleOnClickNext = () => {
		indexInCarousel + 1 > props.scenarios.length - 1 ? setIndexInCarousel(0) : setIndexInCarousel(indexInCarousel + 1);
	};


	return (
		<CarouselProvider
			naturalSlideWidth={10}
			naturalSlideHeight={6}
			totalSlides={props.scenarios.length}
			infinite={true}
			currentSlide={props.currentSlide ? props.currentSlide : 0}
			dragEnabled={false}
		>
			<Slider>
				{props.scenarios.map((scenario, ind) => <Slide key={ind} index={ind}><ScenarioPreviewCard key={ind} scenario={scenario}></ScenarioPreviewCard></Slide>)}
			</Slider>

			<div style={{ marginTop: 20 }}>
				<Typography style={{ color: "white", fontWeight: 600, fontSize: 18 }} onDragStart={(e) => { e.preventDefault(); }}>
					{"Scenario " + (indexInCarousel + 1) + " of " + props.scenarioPerIndex.size}
				</Typography>
				<ButtonBack onClick={() => handleOnClickBack()} style={{ color: "#6C676B" }}><ArrowCircleLeftIcon fontSize="large" /></ButtonBack>
				<ButtonNext onClick={() => handleOnClickNext()} style={{ color: "#6C676B" }}><ArrowCircleRightIcon fontSize="large" /></ButtonNext>
			</div>
		</CarouselProvider >
	);
};

export default ScenarioPreviewCarousel;