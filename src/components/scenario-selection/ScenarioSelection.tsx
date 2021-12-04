import { Grid } from "@mui/material";
import useGetScenarios from "../../hooks/react-query-hooks/scenario/UseGetScenarios";
import ScenarioCard from "./ScenarioCard";


const ScenarioSelection = () => {
    const { isLoading, isError, scenarios } = useGetScenarios();

    if (isLoading) {
        return (<div>Loading...</div>)
    } else {
        return (
            <div>
                <Grid container>
                    <Grid item md={6} sx={{ display: { xs: "none", md: "block" } }}>
                        <img src="" alt="scenario preview" />
                    </Grid>
                    <Grid item xs={12} md={6} style={{ overflowY: "scroll" }}>
                        {scenarios.map(scenario =>
                            <ScenarioCard scenario={scenario} />
                        )
                        }
                    </Grid>
                </Grid>
            </div>
        )
    }


}

export default ScenarioSelection;