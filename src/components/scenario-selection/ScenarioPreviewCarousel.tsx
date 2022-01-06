import "pure-react-carousel/dist/react-carousel.es.css";
import { CarouselProvider, Slider, Slide } from "pure-react-carousel";
import React, { useEffect, useState } from "react";
import ScenarioType from "../../types/Game/ScenarioType";
import ScenarioPreviewCard from "./ScenarioPreviewCard";

interface ScenarioPreviewCarouselProps {
	scenarios: ScenarioType[];
	callbackSelectScenario: any;
	currentSlide: number;
	scenarioPerIndex: Map<number, ScenarioType>;
}



const ScenarioPreviewCarousel = (props: ScenarioPreviewCarouselProps) => {
	const [indexInCarousel] = useState<number>(0);

	useEffect(() => {
		props.scenarios.map((scenario, ind) => {
			props.scenarioPerIndex.set(ind, scenario);
		});

		props.callbackSelectScenario(props.scenarioPerIndex.get(0));
	}, [props.scenarios]);

	useEffect(() => {
		props.callbackSelectScenario(props.scenarioPerIndex.get(indexInCarousel));
	}, [indexInCarousel]);


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

		</CarouselProvider >
	);
};

export default ScenarioPreviewCarousel;