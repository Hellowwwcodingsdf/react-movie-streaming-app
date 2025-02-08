import { Reel } from "../components";

const NowPlaying = (props) => {
    return (
        <Reel tmdb={props.tmdb} uri="now_playing" title="Now Streaming" /> 
    );
}

export default NowPlaying;
