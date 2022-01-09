/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import GameType from "../../types/Game/GameType";
import ResponseMessageType from "../../types/ResponseMessageType";
import * as gameApi from "../../api/game/GameApi";
import useGame from "../../hooks/context-hooks/game/UseGame";
import useMap from "../../hooks/context-hooks/game/UseMap";
import usePhase from "../../hooks/context-hooks/game/UsePhase";
import usePlayer from "../../hooks/context-hooks/game/UsePlayer";
import { LoadingScreen } from "../extra/LoadingScreen";
import useErrorHandler from "../../hooks/context-hooks/UseErrorHandler";
import { error } from "../../theme/colors";

interface GameInitializerProps {
	setInitializing: React.Dispatch<React.SetStateAction<boolean>>;
}

const GameInitializer = (gameInitializerProps: GameInitializerProps) => {
	const { setMeta, setCreator, setMaxTime } = useGame();
	const { setMap } = useMap();
	const { setPhase, setLastUpdate } = usePhase();
	const { setPlayers, setCurrentPlayer } = usePlayer();
	const { setError } = useErrorHandler();
	const navigate = useNavigate();

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
			setError(rmt);
			navigate("/home");
		}
	});

	useEffect(() => {
		mutate(gameUuid!);
	}, []);

	return (
			<div>
				<LoadingScreen/>
			</div>
	);
};

export default GameInitializer;