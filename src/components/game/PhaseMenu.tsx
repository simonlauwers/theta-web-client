import React from "react";
import useGame from "../../hooks/UseGame";

const PhaseMenu = () => {
	const { phase } = useGame();

	return (
		<div>
			{phase}
		</div>
	);
};

export default PhaseMenu;