/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useParams } from "react-router-dom";
import GameType from "../../types/game/GameType";
import ResponseMessageType from "../../types/ResponseMessageType";
import * as gameApi from "../../api/game/GameApi";
import useGame from "../../hooks/context-hooks/game/UseGame";
import useMap from "../../hooks/context-hooks/game/UseMap";
import usePhase from "../../hooks/context-hooks/game/UsePhase";
import usePlayer from "../../hooks/context-hooks/game/UsePlayer";
import { LoadingScreen } from "../extra/LoadingScreen";

interface GameInitializerProps {
	setInitializing: React.Dispatch<React.SetStateAction<boolean>>;
}

const GameInitializer = (gameInitializerProps: GameInitializerProps) => {
	const { setMeta, setCreator, setMaxTime } = useGame();
	const { setMap } = useMap();
	const { setPhase, setLastUpdate } = usePhase();
	const { setPlayers, setCurrentPlayer } = usePlayer();
	const [error, setError] = useState<any>(null);

	const { gameUuid } = useParams<string>();

	const { mutate } = useMutation(gameApi.game, {
		onSuccess: (data: GameType) => {
			setMeta({ uuid: data.uuid, scenarioUuid: data.scenario.uuid });
			setCreator(data.creator.uuid);
			setMaxTime(data.maxTime);
			setMap(data.scenario.map);
			setPhase(data.gamePhase);
			setLastUpdate(data.updateTimestamp);
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
		mutate(gameUuid!);
	}, []);

	if (error !== null) {
		return (
			<div>
				{error.message}
			</div>
		);
	}

	return (
		<div>
			<LoadingScreen />
		</div>
	);
};

export default GameInitializer;