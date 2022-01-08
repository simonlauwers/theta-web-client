import React from "react";
import usePlayer from "../../hooks/context-hooks/game/UsePlayer";
import useAuth from "../../hooks/context-hooks/UseAuth";
import TerritoryCard from "./TerritoryCard";

const TerritoryCards = () => {
    const { players } = usePlayer();
    const { user } = useAuth();

    return (
        <div style={{position: "absolute", top: 0, left: "20vh", right:"20vh", display: "flex", flexWrap: "nowrap" }}>
            {players.filter(player => player.user.uuid === user?.userId)[0].playerTerritoryCards
            .flatMap(territorycard => territorycard.territoryCard).map(card => <TerritoryCard key={card.uuid} territoryCard={card}/>)}
        </div>
    );
};

export default TerritoryCards;