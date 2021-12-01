import { Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import Scenario from "../../types/Scenario";

interface ScenarioCardProps {
    scenario : Scenario;
}

const ScenarioCard = (props: ScenarioCardProps) => {
    return (
        <Card>
            <CardContent>
                <Typography>
                    {props.scenario.name}
                </Typography>
                <Typography>
                    {props.scenario.description}
                </Typography>
            </CardContent>
        </Card>
    )

}

export default ScenarioCard;