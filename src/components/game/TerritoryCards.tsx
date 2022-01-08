import { Avatar, IconButton } from "@mui/material";
import React, { useState } from "react";
import usePlayer from "../../hooks/context-hooks/game/UsePlayer";
import useAuth from "../../hooks/context-hooks/UseAuth";
import TerritoryCard from "./TerritoryCard";
import StyleOutlinedIcon from "@mui/icons-material/StyleOutlined";

const TerritoryCards = () => {
    const { players } = usePlayer();
    const { user } = useAuth();

    const [ showing, setShowing ] = useState(false);
    return (
        <>
            <div style={{position: "absolute", bottom: "17vh", left: "1vw", display: "flex", flexWrap: "nowrap" }}>
                <Avatar alt="show cards" sx={{ width: 75, height: 75, background: "linear-gradient(180deg, rgba(0,39,67,1) 0%, rgba(14,14,56,1) 100%)"}}>
                    <IconButton aria-label="cards" sx={{color:"white", height: "100%", width: "100%"}} onClick={() => {setShowing(!showing);}}>
                        <StyleOutlinedIcon sx={{height: "90%", width: "90%"}}/>
                    </IconButton>
                </Avatar>
            </div>
            <div style={{position: "absolute", bottom: "27vh", left: showing ? 0 : -2000, flexWrap: "nowrap",
            width: "70vw", display: "flex" , transition: "left 1s", userSelect: "none"
            }}>
                {players.filter(player => player.user.uuid === user?.userId)[0].playerTerritoryCards
                .flatMap(territorycard => territorycard.territoryCard).map(card => 
                <TerritoryCard key={card.uuid} territoryCard={card}/>)}
            </div>
        </>

    );
};

export default TerritoryCards;