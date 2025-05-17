import React from "react";
import { Reel } from "../components";

const NowPlaying = (props) => {
    return (
        <div className="h-screen w-screen bg-[url('/background.png')] bg-cover bg-center text-shadow fade-bottom flex items-center justify-center">
            <Reel tmdb={props.tmdb} uri="now_playing" title="Now Streaming" />
        </div>
    );
};

export default NowPlaying;

