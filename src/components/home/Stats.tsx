import { Typography } from "@mui/material";
import React from "react";
import useAuth from "../../hooks/context-hooks/UseAuth";
import "./Stats.css";

export const Stats = () => {
    const { user } = useAuth();
    return (
        <div className="statsContainer" style={{ zIndex: 10 }}>
            <h1 style={{
                color: "ghostwhite"
            }}>Your stats</h1>            <Typography sx={{ color: "white" }}>Powered by Kibana</Typography>
            <div className="container">
                <iframe className="responsive-iframe" src={`https://analytics.theta-risk.com/__kibana/app/dashboards#/view/3532b040-5b6d-11ec-98c6-7736b9802ecb?embed=true&_g=(filters:!(),refreshInterval:(pause:!f,value:2000),time:(from:now-1y%2Fd,to:now))&_a=(description:'This%20dashboard%20will%20show%20the%20following%20things%20and%20probably%20more:%20%0A-%20%23%20Territories%20conquered%20%20%0A-%20%23%20Areas(continents)%20conquered%20%0A-%20%23%20Troops%20deployed%2Fdestroyed%20%0A-%20Most%20played%20scenario%0A-%20%23%20Received%20troops%20from%20Used%20T.%20cards%0A-%20%23%20Used%20T.%20cards%0A-%20......',filters:!(('$state':(store:appState),meta:(alias:'User%20id',disabled:!f,index:'4114d6f0-69b3-11ec-95cb-b3aa04e4302d',key:id,negate:!f,params:(query:${user?.userId}),type:phrase),query:(match_phrase:(id:${user?.userId})))),fullScreenMode:!f,options:(hidePanelTitles:!f,syncColors:!f,useMargins:!t),panels:!((embeddableConfig:(enhancements:(),hidePanelTitles:!t),gridData:(h:12,i:f9cf4dcd-b1d3-4f94-aaaa-48841abfff4e,w:8,x:0,y:0),id:d62141a0-69ba-11ec-95cb-b3aa04e4302d,panelIndex:f9cf4dcd-b1d3-4f94-aaaa-48841abfff4e,type:lens,version:'7.15.2'),(embeddableConfig:(enhancements:(),hidePanelTitles:!t),gridData:(h:12,i:'612912d6-cfe8-4001-9f2e-d2e2898e3f36',w:8,x:8,y:0),id:dc8e7580-69ba-11ec-95cb-b3aa04e4302d,panelIndex:'612912d6-cfe8-4001-9f2e-d2e2898e3f36',type:lens,version:'7.15.2'),(embeddableConfig:(enhancements:(),hidePanelTitles:!t),gridData:(h:12,i:d7f48511-b591-4982-8672-fb5402711bbb,w:16,x:16,y:0),id:e568b1c0-69ba-11ec-95cb-b3aa04e4302d,panelIndex:d7f48511-b591-4982-8672-fb5402711bbb,type:lens,version:'7.15.2'),(embeddableConfig:(enhancements:(),hidePanelTitles:!t),gridData:(h:12,i:f49d7ff3-4c80-42bc-bf62-8aa7db399687,w:8,x:32,y:0),id:eacf9930-69ba-11ec-95cb-b3aa04e4302d,panelIndex:f49d7ff3-4c80-42bc-bf62-8aa7db399687,type:lens,version:'7.15.2'),(embeddableConfig:(enhancements:(),hidePanelTitles:!t),gridData:(h:12,i:'480a49c5-5956-4ebd-b70d-f5efc93ceb26',w:8,x:40,y:0),id:f02fc9e0-69ba-11ec-95cb-b3aa04e4302d,panelIndex:'480a49c5-5956-4ebd-b70d-f5efc93ceb26',type:lens,version:'7.15.2'),(embeddableConfig:(enhancements:(),hidePanelTitles:!t),gridData:(h:12,i:'872656af-b74c-4a50-8260-a4ce995c4fa9',w:16,x:0,y:12),id:f7e89090-69ba-11ec-95cb-b3aa04e4302d,panelIndex:'872656af-b74c-4a50-8260-a4ce995c4fa9',type:lens,version:'7.15.2'),(embeddableConfig:(enhancements:(),hidePanelTitles:!t),gridData:(h:12,i:'6e63f959-d8b2-4348-89b6-e87482b297cd',w:16,x:16,y:12),id:ff5273f0-69ba-11ec-95cb-b3aa04e4302d,panelIndex:'6e63f959-d8b2-4348-89b6-e87482b297cd',type:lens,version:'7.15.2'),(embeddableConfig:(enhancements:(),hidePanelTitles:!t),gridData:(h:12,i:'2ff4aa59-ff16-45f2-8896-9693a450ccfc',w:16,x:32,y:12),id:'06fd57f0-69bb-11ec-95cb-b3aa04e4302d',panelIndex:'2ff4aa59-ff16-45f2-8896-9693a450ccfc',type:lens,version:'7.15.2')),query:(language:kuery,query:''),tags:!(),timeRestore:!t,title:'Risk-Player%20dashboard',viewMode:view)`}></iframe>
            </div>

        </div>

    );
};
