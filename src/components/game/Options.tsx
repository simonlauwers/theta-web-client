import React from "react";
import LeaveOption from "./options/LeaveOption";

const Options = () => {
    return (
        <div style={{position: "absolute", top: 0, left: 0, userSelect: "none", overflow:"none", padding: "1rem"}}>
            <LeaveOption/>
        </div>
    );
};

export default Options;
