import { Typography } from "@mui/material";
import React from "react";
import TerritoryCardType from "../../types/Game/TerritoryCardType";

interface TerritoryCardProps {
    territoryCard: TerritoryCardType; 
}

const TerritoryCard = (territoryCardProps : TerritoryCardProps) => {    
    return (
        <div style={{width: "19%", height: "30vh", background: "linear-gradient(180deg, rgba(0,39,67,1) 0%, rgba(14,14,56,1) 100%)", 
        marginLeft: "1%", borderRadius:"1rem"}}>
            <img alt={territoryCardProps.territoryCard.troopType} src={`/media/photos/game-visuals/${territoryCardProps.territoryCard.troopType}.png`}
            style={{height: "auto", width: "100%"}}/>
            <Typography color="white" variant="h5" style={{position:"absolute", bottom: 0, padding: "1rem"}}>
                {territoryCardProps.territoryCard.territory !== null ? territoryCardProps.territoryCard.territory.name : ""}
            </Typography>
        </div>
    );
};

export default TerritoryCard;