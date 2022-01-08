/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useEffect, useState } from "react";
import usePhase from "../../hooks/context-hooks/game/UsePhase";
import usePlayer from "../../hooks/context-hooks/game/UsePlayer";
import useAuth from "../../hooks/context-hooks/UseAuth";
import GameType from "../../types/Game/GameType";
import AttackControl from "./phase-controls/AttackControl";
import DraftControl from "./phase-controls/DraftControl";
import FortifyControl from "./phase-controls/FortifyControl";
import PollControl from "./phase-controls/PollControl";
import useGame from "../../hooks/context-hooks/game/UseGame";
import AiControl from "./phase-controls/AiControl";
import useError from "../../hooks/context-hooks/game/UseError";
import Timer from "./Timer";
import parsePlayerColor from "../../utils/game/PlayerColorParser";
import { success } from "../../theme/colors";

const Controls = () => {
	const { creator, maxTime } = useGame();
	const { phase, setPhase, setLastUpdate } = usePhase();
	const { currentPlayer, setPlayers, setCurrentPlayer } = usePlayer();
	const { user } = useAuth();
	const { setError} = useError();

	const [ game, setGame ] = useState<GameType | null>(null);
	const [ allowAction, setAllowAction ] = useState(false);
	const [ fireAction, setFireAction ] = useState(false);
	const [ next, setNext ] = useState(false);
	const [ backgroundColor, setBackgroundColor ] = useState<string>("");
	const [ hover, setHover ] = useState(false);

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

	useEffect(() => {
		setBackgroundColor(parsePlayerColor(currentPlayer!.playerColor)!.gradient);
	}, [currentPlayer]);

	return (
		<>
			{maxTime > 0 && <Timer next={next} setNext={setNext}/>}
			<div style={{position: "absolute", bottom: 0, left: 0, userSelect: "none", overflow:"none"}}>
				<div style={{height : "15vh", width : "60vw", display: "flex"}}>
					<div style={{padding: "2rem", 
									width: currentPlayer?.user.uuid === user?.userId && !currentPlayer?.aiPlayer ? "60%" : "0%", 
									height: "100%", background: backgroundColor, display: "flex", alignContent: "center",
									transition: "width 1s, background 1s"
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
					<div style={{width: "40%", height: "100%", 
					background: backgroundColor, 
					display: "flex", 
					alignItems: "center", 
					borderTopRightRadius: "1rem",
					transition: "background: 1s"}}>
						<div style={{display: "flex", alignItems: "center"}}>
							<h1 onClick={() => {if(allowAction) {setFireAction(true);}}}
							onMouseEnter={() => {if(allowAction) {setHover(true);}}}
							onMouseLeave={() => {setHover(false);}}
							style={{ 
							fontSize: "10vh", 
							margin: 0,
							transition: "color 1s, text-shadow 1s",
							color: allowAction ? hover ? success[400] : "#D23F57" : "white",
							cursor: allowAction ? "pointer" : "default",
							textShadow: allowAction ? "0px 0px 20px black" : ""
							}}><b>{phase}</b></h1>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};


export default Controls;