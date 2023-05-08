import React, {useEffect, useState, useContext} from "react";
import { ListItem, ListItemText, ListItemAvatar, Typography } from "@mui/material"
import useContextMenu from "../components/useContextMenu";
import { ContextMenu } from "../styles/styles";
import AuthContext from "../context/AuthContext";
import axios from 'axios';

const backend_uri = window.location.href.split(':')[0] + ':' + window.location.href.split(':')[1] + ":8888"

export default function TrackSearchResult({ track, chooseTrack }) {

    const { clicked, setClicked, points, setPoints } = useContextMenu();
    const { code, accessToken, setAccessToken, refreshToken, setRefreshToken, expiresIn, setExpiresIn } = useContext(AuthContext);

    function addToQueue(){
        var activeDevice;

        // console.log("Added to Queue ***********", track.uri)
        axios.get(backend_uri + `/active_device`, {
            params: {
                access_token: accessToken
            }
        }).then(function (response) {
           // console.log(response.data);
            activeDevice = response.data['active_device']
            axios.post(backend_uri + `/addToQ`, {
                access_token: accessToken,
                active_device: activeDevice,
                trackURI: track.uri
            })
        })

    }

    return (
        <ListItem
            style={{ cursor: "pointer" }}
            onClick ={ (e) => {
                //e.preventDefault();
                setClicked(!clicked)
                setPoints(e.pageX, e.pageY)
                // console.log("Menu Click", e.pageX, e.pageY, clicked);
            }}
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

             {clicked && (
                <ContextMenu top={points.y} left={points.x}>
                    <ul>
                        <li onClick={() => addToQueue()}>Add to Queue</li>
                    </ul>
                </ContextMenu>
            )}

        </ListItem >
    )
}