/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from "react";
import FlagCircleOutlinedIcon from "@mui/icons-material/FlagCircleOutlined";
import { Button, Dialog, DialogActions, DialogContent, Typography, IconButton, Tooltip } from "@mui/material";
import { useMutation } from "react-query";
import ResponseMessageType from "../../../types/ResponseMessageType";
import useGame from "../../../hooks/context-hooks/game/UseGame";
import * as gameApi from "../../../api/game/GameApi";
import useError from "../../../hooks/context-hooks/game/UseError";
import { useNavigate } from "react-router-dom";
import { backgroundColor } from "../../../theme/colors";

const LeaveOption = () => {
    const { meta } = useGame();
    const { setError } = useError();
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const { mutate } = useMutation(gameApi.leaveGame, {
		onSuccess: () => {
			navigate("/home");
		},
		onError: (e: any) => {
			const rmt = e.response.data as ResponseMessageType;
			setError(rmt);
		}
	});

    const leave = () => {
        mutate(meta?.uuid!);
    };

    return (
        <div>
            <Tooltip title="Forfeit">
                <IconButton aria-label="leave" sx={{color:"white", width: "3vw", height: "3vw"}} onClick={handleClickOpen}>
                  <FlagCircleOutlinedIcon sx={{color:"white", width: "3vw", height: "3vw"}}/>
                </IconButton>
            </Tooltip>
            <Dialog
              open={open}
              keepMounted
              onClose={handleClose}
              aria-describedby="alert-dialog-slide-description"
            >
                <DialogContent style={{background: backgroundColor.main}}>
                    <Typography color="white">
                        Are you sure you want to forfeit this game?
                    </Typography>
                </DialogContent>
                <DialogActions style={{background: backgroundColor.main}}>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={leave}>Forfeit</Button>
              </DialogActions>
            </Dialog>
        </div>
    );
};

export default LeaveOption;