import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import PlayerContext from "../context/PlayerContext";
import { Button } from '@mui/material'
import Player from "../components/Player"
//import Player_Premade from "../components/Player_Premade"
import Header from "../components/Header";
import TrackSearchResult from "../components/TrackSearchResults";
import axios from 'axios'
import SpotifyWebApi from "spotify-web-api-node";
import '../styles/dashboard.css'
import config from "../config";
import { List, Divider } from "@mui/material"


var spotifyApi = new SpotifyWebApi({
    clientId: config.client_id,
    clientSecret: config.client_secret
});

function Dashbaord() {
    const { code, accessToken, setAccessToken, refreshToken, setRefreshToken, expiresIn, setExpiresIn } = useContext(AuthContext)
    const { track, setTrack } = useContext(PlayerContext)
    const [searchResults, setSearchResults] = useState([])
    const [searchText, setSearchText] = useState('');
    const [playingTrack, setPlayingTrack] = useState()

    let navigate = useNavigate();

    useEffect(() => {
        if (!accessToken) return
        spotifyApi.setAccessToken(accessToken)
    }, [accessToken])

    useEffect(() => {
        axios.post('http://localhost:8888/login', { code: code })
            .then(res => {
                console.log(res.data)
                setAccessToken(res.data.accessToken)
                setRefreshToken(res.data.refreshToken)
                setExpiresIn(res.data.expiresIn)
                // window.history.pushState({}, null, "/")
            })
            .catch(err => {
                console.log(err)
                return navigate('/');
            })



        useEffect(() => {
            if (!refreshToken || !expiresIn) return

            const interval = setInterval(() => {
                console.group('Refreshing...')
                axios.post('http://localhost:8888/refresh', { refreshToken })
                    .then(res => {
                        console.log(res.data)
                        setAccessToken(res.data.accessToken)
                        setExpiresIn(res.data.expiresIn)
                        // window.history.pushState({}, null, "/")
                    })
                    .catch(err => {
                        console.log(err)
                        return navigate('/');
                    })
            }, (expiresIn - 60) * 1000)

            return () => clearInterval(interval)
        }, [refreshToken, expiresIn])

        function chooseTrack(track) {
            setTrack(track)
            setSearchText("")
        }

        return (
            <div className="dash">
                <Header
                    spotifyApi={spotifyApi}
                    searchResults={searchResults}
                    setSearchResults={setSearchResults}
                    searchText={searchText}
                    setSearchText={setSearchText}
                />
                <div className="dash-header">
                    <List>
                        {searchResults.map(track => (
                            <TrackSearchResult
                                track={track}
                                key={track.uri}
                                chooseTrack={chooseTrack}
                            />
                        ))}
                    </List>
                    {/* <Player_Premade accessToken={accessToken} trackUri={playingTrack?.uri} /> */}
                    <Player />
                </div>
            </div>
        );
    }

export default Dashbaord;