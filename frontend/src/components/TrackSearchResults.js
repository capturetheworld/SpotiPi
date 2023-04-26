import React from "react"
import { ListItem, ListItemText, ListItemAvatar, Typography } from "@mui/material"
export default function TrackSearchResult({ track, chooseTrack }) {
    function handlePlay() {
        chooseTrack(track)
    }

    return (
        <ListItem
            style={{ cursor: "pointer" }}
            onClick={handlePlay}
        >
            <ListItemAvatar>
                <img src={track.albumUrl} style={{ height: "64px", width: "64px" }} />
            </ListItemAvatar>
            
            <ListItemText
                style={{marginLeft: '10px'}}
                primary={track.title}
                secondary={
                    <React.Fragment>

                        <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="gray"
                        >
                            {track.artist}
                        </Typography>
                    </React.Fragment>
                }
            />
        </ListItem >
    )
}