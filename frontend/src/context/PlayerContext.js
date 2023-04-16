import { createContext } from "react";

const PlayerContext = createContext({
    trackName:'',
    progress:0,
    duration:0,
    setTrackName: () => {},
    setProgress: () => {},
    setDuration: () => {},
});

export default PlayerContext