import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useParams } from "react-router-dom";
import useGame from "../../hooks/UseGame";
import GameType from "../../types/Game/GameType";
import ResponseMessageType from "../../types/ResponseMessageType";
import * as gameApi from "../../api/game/GameApi";

const GameInitializer = () => {

	const { setMeta, setPhase, setPlayers, setCurrentPlayer } = useGame();
	const [ error, setError ] = useState<any>();

	const { gameUuid } = useParams<string>();

	const { mutate, isLoading } = useMutation(gameApi.game, {
		onSuccess: (data: GameType) => {
			setMeta({uuid: data.uuid, scenarioUuid: data.scenario.uuid});
			setPhase(data.gamePhase);
			setPlayers(data.players);
			setCurrentPlayer(data.currentPlayer);
			console.log(data);
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

	return (
        
		isLoading?
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