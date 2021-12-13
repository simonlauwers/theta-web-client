import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useParams } from "react-router-dom";
import GameType from "../../types/Game/GameType";
import ResponseMessageType from "../../types/ResponseMessageType";
import * as gameApi from "../../api/game/GameApi";
import useGame from "../../hooks/context-hooks/game/UseGame";
import useMap from "../../hooks/context-hooks/game/UseMap";
import usePhase from "../../hooks/context-hooks/game/UsePhase";
import usePlayer from "../../hooks/context-hooks/game/UsePlayer";

interface GameInitializerProps {
	setInitializing: React.Dispatch<React.SetStateAction<boolean>>;
}

const GameInitializer = (gameInitializerProps: GameInitializerProps) => {
	const { setMeta } = useGame();
	const { setMap } = useMap();
	const { setPhase } = usePhase();
	const { setPlayers, setCurrentPlayer } = usePlayer();
	const [setError] = useState<any>();

	const { gameUuid } = useParams<string>();

	const { mutate, isLoading } = useMutation(gameApi.game, {
		onSuccess: (data: GameType) => {
			setMeta({ uuid: data.uuid, scenarioUuid: data.scenario.uuid });
			setMap(data.scenario.map);
			setPhase(data.gamePhase);
			setPlayers(data.players);
			setCurrentPlayer(data.currentPlayer);
			gameInitializerProps.setInitializing(false);
		},
		onError: (e: any) => {
			const rmt = e.response.data as ResponseMessageType;
			console.log(rmt);
			setError(rmt);
		}
	});

	useEffect(() => {
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		mutate(gameUuid!);
	}, []);

	return (

		isLoading ?
			<div>
				Loading
			</div>
			:
			<div>
				Game loaded
			</div>


	);
};

export default GameInitializer;