import React from "react";
import usePhase from "../../hooks/context-hooks/game/UsePhase";

const PhaseMenu = () => {
	const { phase } = usePhase();
	
	return (
		<div>
			{phase}
		</div>
	);
};

export default PhaseMenu;