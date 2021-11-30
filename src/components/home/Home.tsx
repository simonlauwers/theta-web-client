import { Zoom } from "@mui/material";

const Home = () => {
    return (
        <Zoom in={true} style={{ transitionDelay: '500ms' }}>
            <h1>hi, ik ben Home.tsx</h1>
        </Zoom>
    )
}

export default Home;