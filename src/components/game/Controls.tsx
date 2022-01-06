import React, { useEffect, useState } from "react";
import usePhase from "../../hooks/context-hooks/game/UsePhase";
import usePlayer from "../../hooks/context-hooks/game/UsePlayer";
import useAuth from "../../hooks/UseAuth";
import GameType from "../../types/Game/GameType";
import AttackControl from "./phase-controls/AttackControl";
import DraftControl from "./phase-controls/DraftControl";
import FortifyControl from "./phase-controls/FortifyControl";
import PollControl from "./phase-controls/PollControl";
import { backgroundColor } from "../../theme/colors";
import useGame from "../../hooks/context-hooks/game/UseGame";
import AiControl from "./phase-controls/AiControl";
import useError from "../../hooks/context-hooks/game/UseError";
import Timer from "./Timer";

const Controls = () => {
	const { creator, maxTime } = useGame();
	const { phase, setPhase, setLastUpdate } = usePhase();
	const { currentPlayer, setPlayers, setCurrentPlayer } = usePlayer();
	const { user } = useAuth();
	const { setError} = useError();

	const [ game, setGame ] = useState<GameType | null>(null);
	const [ allowAction, setAllowAction ] = useState(false);
	const [ fireAction, setFireAction ] = useState(false);
	const [ next, setNext ] = useState(true);

	useEffect(() => {
		if (game !== null) {
			setPhase(game.gamePhase);
			setLastUpdate(game.updateTimestamp);
			setPlayers(game.players);
			setCurrentPlayer(game.currentPlayer);
			setNext(false);
		}
	}, [game]);

	useEffect(() => {
		if(fireAction) {
			setFireAction(false);
		}
	}, [fireAction]);

	return (
		<>
			{maxTime > 0 && <Timer next={next} setNext={setNext}/>}
			<div style={{position: "absolute", bottom: 0, left: 0, userSelect: "none", overflow:"none"}}>
				<div style={{height : "20vh", width : "50vw", display: "flex"}}>
					<div style={{padding: "2rem", 
									width: currentPlayer?.user.uuid === user?.userId && !currentPlayer?.aiPlayer ? "80%" : "0%", 
									height: "100%", background: backgroundColor.main, display: "flex", alignContent: "center",
									transition: "width 1s"
								}}>
						<div style={{display: "flex", alignItems:"center", width:"100%"}}>
							{(currentPlayer?.user.uuid === user?.userId && !currentPlayer?.aiPlayer) ? 
							<>
								{phase === "DRAFT" && <DraftControl setGame={setGame} setError={setError} 
								setAllowAction={setAllowAction} fireAction={fireAction} next={next}/>}
								{phase === "ATTACK" && <AttackControl setGame={setGame} setError={setError}
								setAllowAction={setAllowAction} fireAction={fireAction} next={next}/>}
								{phase === "FORTIFY" && <FortifyControl setGame={setGame} setError={setError}
								setAllowAction={setAllowAction} fireAction={fireAction} next={next}/>}
							</>
							:
							<>
								<PollControl setGame={setGame} setError={setError}/>
								{currentPlayer?.aiPlayer && user?.userId === creator && <AiControl setError={setError}/>}
							</>
							}
						</div>
					</div>
					<div style={{width: "50%", height: "100%", 
					background: "linear-gradient(to left, rgba(20,17,36,0) 10%, rgba(20,17,36,1) 100%)", 
					display: "flex", alignItems: "center"}}>
						<div style={{display: "flex", alignItems: "center"}}>
							<h1 onClick={() => {if(allowAction) {setFireAction(true);}}} style={{ 
							fontSize: "10vh", 
							margin: 0,
							transition: "color 1s",
							color: allowAction ? "#D23F57" : "white",
							cursor: allowAction ? "pointer" : "default"
							}}><b>{phase}</b></h1>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};


export default Controls;