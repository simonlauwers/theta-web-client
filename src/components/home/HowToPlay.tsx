import React from "react";
import { Box } from "@mui/material";

const HowToPlay = () => {
	return (
		<div style={{ zIndex: 1001, width: "80%" }} >
			<h1 style={{ color: "white" }} >How to play</h1>
            <div style={{marginBottom: 20, width: "100%"}}>
                <Box component="div" style={{background: "linear-gradient(180deg, rgba(0,39,67,0.5) 0%, rgba(14,14,56,0.5) 100%)", 
                borderRadius: 10, padding: 10, margin: 2, width: "100%"}}>
                    <h2 style={{ color: "white", paddingLeft: 30, paddingRight: 30 }} >Objective</h2>
                    <p style={{ color: "white", paddingLeft: 30, paddingRight: 30 }} >
                        To conquer the world by occupying all territories on the board. You need to eliminate all your opponents.
                    </p>
                </Box>
            </div>
            <div style={{marginBottom: 20, width: "100%"}}>
                <Box component="div" style={{background: "linear-gradient(180deg, rgba(0,39,67,0.5) 0%, rgba(14,14,56,0.5) 100%)", 
                borderRadius: 10, padding: 10, margin: 2, width: "100%"}}>
                    <h2 style={{ color: "white", paddingLeft: 30, paddingRight: 30 }} >What happens at the start of each game?</h2>
                    <p style={{ color: "white", paddingLeft: 30, paddingRight: 30}}>
                        - All players receive a random colour for which they will be proudly fighting for!<br/>
                        - Each player receives a random amount of territories with a random amount of troops on it, but in total everyone will receive the same amount of troops, we still keep it fair.<br/>
                        - One random player is selected to start the war of the territories.  <br/>
                    </p>
                </Box>
            </div>
            <div style={{marginBottom: 20, width: "100%"}}>
                <Box component="div" style={{background: "linear-gradient(180deg, rgba(0,39,67,0.5) 0%, rgba(14,14,56,0.5) 100%)", 
                borderRadius: 10, padding: 10, margin: 2, width: "100%"}}>
                    <h2 style={{ color: "white", paddingLeft: 30, paddingRight: 30 }} >The game itself</h2>

                    <p style={{ color: "white", paddingLeft: 30, paddingRight: 30 }} >
                        Each of your turns consists of three phases, in this order: <br/>
                        - Drafting<br/>
                        - Attacking<br/>
                        - Fortifying<br/>
                    </p>

                    <h3 style={{ color: "white", paddingLeft: 30, paddingRight: 30 }} >Drafting</h3>
                    <p style={{ color: "white", paddingLeft: 30, paddingRight: 30 }} >
                        At the beginning of every turn (including your first), the number of territories that you currently occupy will be counted, then divide the total by three (fraction ignored).
                        The answer is the number of troops you receive. Place the new troops on any territory you already occupy.<br/>
                        Example: 11 territories = 3 troops, 14 territories = 4 troops, 17 territories = 5 troops. You will always receive at least 3 troops on a turn, even if you occupy fewer than 9 territories.
                    </p>

                    <h3 style={{ color: "white", paddingLeft: 30, paddingRight: 30 }} >Areas</h3>
                    <p style={{ color: "white", paddingLeft: 30, paddingRight: 30 }} >
                        In addition, at the beginning of your turn, you will receive troops for each area you control. (To control an area, you must occupy all its territories at the start of your turn).
                        The number of the extra areas is different for each continent and varies per scenario that you are playing on.
                    </p>

                    <h3 style={{ color: "white", paddingLeft: 30, paddingRight: 30 }} >Territory Cards</h3>
                    <p style={{ color: "white", paddingLeft: 30, paddingRight: 30 }} >
                        Earning Cards<br/>
                        At the end of any turn in which you have captured at least one territory, you will earn one (and only one) Territory card.<br/>
                        Trading in Cards for troops<br/>
                        You are trying to collect sets of 3 cards in any of the following combinations: 3 cards of the same design (Infantry, Cavalry, or Artillery), 1 each of 3 designs, or any 2 plus a &quot wild &quot card.<br/>
                        If you have collected a viable set of 3 Territory cards, then they will be automatically traded in for you. But if you have 5 or 6 cards during the attack phase of your turn, your phase will be set to drafting again and the cards will be once again traded-in.<br/>
                        Occupied territories: If any of the 3 cards you trade in shows the picture of a territory you occupy, you receive 2 extra troops. But the troops will be drafted automatically onto that particular territory.<br/>
                    </p>

                    <h3 style={{ color: "white", paddingLeft: 30, paddingRight: 30 }} >Attacking</h3>
                    <p style={{ color: "white", paddingLeft: 30, paddingRight: 30 }} >
                        After placing your troops at the beginning of your turn, decide if you wish to attack at this time.<br/>
                        The object of an attack is to capture territories by defeating all the opposing troops already on them. The battle is fought by a roll of the dice. Study the map for a moment. Do you want to attack?<br/>
                        If you choose not to attack, click on skip turn. You may still fortify your position if you wish. If you decide to attack, you must follow these rules:<br/>
                        You may only attack a territory that &apos s adjacent (touching) to one of your own, or connected to it by a dashed line.<br/>
                        You must always have at least two troops in the territory you &apos re attacking from.<br/>
                        You may continue attacking one territory until you have eliminated all troops on it, or you may shift your attack from one territory to another, attacking each as often as you want and attacking as many territories as you like during one turn.<br/>
                    </p>

                    <h3 style={{ color: "white", paddingLeft: 30, paddingRight: 30 }} >Attacking</h3>
                    <p style={{ color: "white", paddingLeft: 30, paddingRight: 30 }} >
                        After placing your troops at the beginning of your turn, decide if you wish to attack at this time.<br/>
                        The object of an attack is to capture territories by defeating all the opposing troops already on them. The battle is fought by a roll of the dice. Study the map for a moment. Do you want to attack?<br/>
                        If you choose not to attack, click on skip turn. You may still fortify your position if you wish. If you decide to attack, you must follow these rules:<br/>
                        - You may only attack a territory that &apos s adjacent (touching) to one of your own, or connected to it by a dashed line.<br/>
                        - You must always have at least two troops in the territory you &apos re attacking from.<br/>
                        - You may continue attacking one territory until you have eliminated all troops on it, or you may shift your attack from one territory to another, attacking each as often as you want and attacking as many territories as you like during one turn.<br/>
                    </p>

                    <h3 style={{ color: "white", paddingLeft: 30, paddingRight: 30 }} >How to Attack</h3>
                    <p style={{ color: "white", paddingLeft: 30, paddingRight: 30 }} >
                        1. Whenever you want to attack a territory, you should select one of your bordering territories.<br/>
                        2. If selected properly, there will appear some arrows pointing to adjacent enemy territories.<br/>
                        3. Whenever the enemy territory is selected, you will be asked to select from a range of amount of troops, ranging from 2 or 3.<br/>
                        4. When done correctly, some dice will appear on the screen and decide the fate of the troops on the battlefield.<br/>
                    </p>

                    <h3 style={{ color: "white", paddingLeft: 30, paddingRight: 30 }} >How is the Battle decided</h3>
                    <p style={{ color: "white", paddingLeft: 30, paddingRight: 30 }} >
                        The dice are compared to the highest die each of you rolled. If yours (the attackers) is higher, the defender loses one army from the territory under attack.<br/>
                        But if the defender &apos s die is higher than yours, you lose one army from the territory you attacked from.<br/>
                        If each of you rolled more than one die, the two next-highest dice are compared.<br/>
                    </p>

                    <h3 style={{ color: "white", paddingLeft: 30, paddingRight: 30 }} >Fortifying</h3>
                    <p style={{ color: "white", paddingLeft: 30, paddingRight: 30 }} >
                        No matter what you have done on your turn, you may end your turn by fortifying your position.<br/>
                        You are not required to win a battle or even to try an attack to do so.<br/>
                        Some players refer to this as the &quot free move &quot.<br/>
                        To fortify your position, move as many troops as you would like from one (and only one) of your territories into one (and only one) of your adjacent territories.<br/>
                        Remember to move troops towards borders where they can help in an attack and leave at least one army behind.<br/>
                    </p>
                </Box>
            </div>
            <div style={{marginBottom: 20, width: "100%"}}>
                <Box component="div" style={{background: "linear-gradient(180deg, rgba(0,39,67,0.5) 0%, rgba(14,14,56,0.5) 100%)", 
                borderRadius: 10, padding: 10, margin: 2, width: "100%"}}>
                    <h2 style={{ color: "white", paddingLeft: 30, paddingRight: 30 }} >End of the Game</h2>
                    <p style={{ color: "white", paddingLeft: 30, paddingRight: 30}}>
                        The winner is the first player to eliminate every opponent by capturing all the territories on the map.<br/>
                        Please enjoy the super immersive Thèta Risk playthrough!!<br/>
                    </p>
                </Box>
            </div>
		</div>
	);
};

export default HowToPlay;