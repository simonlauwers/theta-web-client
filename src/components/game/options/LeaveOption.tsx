/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from "react";
import FlagCircleOutlinedIcon from "@mui/icons-material/FlagCircleOutlined";
import { IconButton } from "@mui/material";
import { useMutation } from "react-query";
import ResponseMessageType from "../../../types/ResponseMessageType";
import useGame from "../../../hooks/context-hooks/game/UseGame";
import * as gameApi from "../../../api/game/GameApi";
import useError from "../../../hooks/context-hooks/game/UseError";
import { useNavigate } from "react-router-dom";

const LeaveOption = () => {
    const { meta } = useGame();
    const { setError } = useError();
    const navigate = useNavigate();

    const { mutate } = useMutation(gameApi.leaveGame, {
		onSuccess: () => {
			navigate("/home");
		},
		onError: (e: any) => {
			const rmt = e.response.data as ResponseMessageType;
			console.log(rmt);
			setError(rmt);
		}
	});

    const leave = () => {
        mutate(meta?.uuid!);
    };

    return (
        <div>
            <IconButton aria-label="leave" size="large" sx={{color:"white"}} onClick={leave}>
              <FlagCircleOutlinedIcon/>
            </IconButton>
        </div>
    );
};

export default LeaveOption;