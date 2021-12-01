import { Grid } from "@mui/material";
import { useQuery } from "react-query";
import UseGetScenarios from "../../query/scenario/UseGetScenarios";
import ScenarioCard from "./ScenarioCard";


const ScenarioSelection = () => {
    const {isLoading, error, entities} = UseGetScenarios();

    return(
        <div>
            <Grid container>
                <Grid item md={6} sx={{ display: { xs: "none", md: "block" }}}>
                    <img src="" alt="scenario preview" />
                </Grid>
                <Grid item xs={12} md={6} style={{overflowY: "scroll"}}>
                    {isLoading?
                        <div>Loading</div>
                        :
                        entities.map(scenario => 
                            <ScenarioCard scenario={scenario}/>
                            )
                    }
                </Grid>
            </Grid>
        </div>
    )
}

export default ScenarioSelection;