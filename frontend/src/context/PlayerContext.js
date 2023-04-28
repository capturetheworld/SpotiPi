import { createContext } from "react";

const PlayerContext = createContext({
    track:'',
    progress:0,
    duration:0,
    setTrack: () => {},
    setProgress: () => {},
    setDuration: () => {},
});

export default PlayerContext