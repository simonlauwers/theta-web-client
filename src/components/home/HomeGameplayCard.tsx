import { Button, Card, CardActions, CardContent, Typography } from "@mui/material";

interface HomeGameplayCardProps {
    backgroundImage: string,
    firstButtonText?: string,
    secondButtonText?: string,
    title: string
}

const HomeGameplayCard = (props: HomeGameplayCardProps) => {
    return (
        <Card sx={{
            minWidth: 200, '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: '0 6px 20px 0 rgba(0,0,0,0.38)',
                transition: 'all 0.5s',
            }, backgroundImage: props.backgroundImage, backgroundSize: "cover", color: "white", fontWeight: 500
        }}>
            <CardContent>
                <Typography fontWeight="800" gutterBottom variant="h5" component="div">
                    {props.title}
                </Typography>
            </CardContent>
            <CardActions>
                {props.firstButtonText === undefined ? null : <Button sx={{ color: "white" }} size="small">{props.firstButtonText}</Button>}
                {props.secondButtonText === undefined ? null : <Button sx={{ color: "white" }} size="small">{props.secondButtonText}</Button>}
            </CardActions>
        </Card>
    )

}

export default HomeGameplayCard;