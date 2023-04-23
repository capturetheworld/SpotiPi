import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import PlayerContext from "../context/PlayerContext";
import { Button } from '@mui/material'
import Player from "../components/Player"
import Header from "../components/Header";
import axios from 'axios'
import SpotifyWebApi from "spotify-web-api-node";
import '../styles/dashboard.css'
import config from "../config";

var spotifyApi = new SpotifyWebApi({
    clientId: config.client_id,
    clientSecret: config.client_secret
});

function Dashbaord() {
    const { code, accessToken, setAccessToken, refreshToken, setRefreshToken, expiresIn, setExpiresIn } = useContext(AuthContext)
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

        console.log(accessToken, refreshToken, expiresIn)
    }, [code])

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
        }, (expiresIn - 60)*1000)

        return () => clearInterval(interval)
    }, [refreshToken, expiresIn])


    const getState = () => {
        let trackName;
        axios.get('http://localhost:8888/state', {
            params: {
                access_token: accessToken
            }
        }).then(response => {
            console.log(response)
            trackName = response.data.item.name
            // setProgress(response.data.progress_ms)
            // setDuration(response.data.duration_ms)
            // console.log(trackName, progress, duration)
        })
        return trackName
    }

    return (
        <div className="dash">
            <Header spotifyApi={spotifyApi}/>
            <div className="dash-header">
                <Button >Refresh state</Button>
                <div className="player-container">
                    <Player />
                </div>
            </div>
        </div>
    );
}

export default Dashbaord;