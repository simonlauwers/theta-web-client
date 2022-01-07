import React from "react";
import TerritoryCardType from "../../types/Game/TerritoryCardType";

interface TerritoryCardProps {
    territoryCard: TerritoryCardType; 
}

const TerritoryCard = (territoryCardProps : TerritoryCardProps) => {
    return (
        <div style={{width: "20%"}}>
            <p>{territoryCardProps.territoryCard.name}</p>
            <p>{territoryCardProps.territoryCard.troopType}</p>
        </div>
    );
};

export default TerritoryCard;