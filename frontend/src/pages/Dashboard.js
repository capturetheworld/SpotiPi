import React, { useState, useEffect, useContext } from "react";
import { Button } from '@mui/material'
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import PlayerContext from "../context/PlayerContext";
import Player from "../components/Player"
import logo from '../pictures/spotipi.png';
import axios from 'axios'
import '../styles/landing.css';

function Dashbaord() {
    const { code, accessToken, setAccessToken, refreshToken, setRefreshToken, expiresIn, setExpiresIn } = useContext(AuthContext)
    let navigate = useNavigate();

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
        <div className="App">
            <div className="App-container">
                <img src={logo} className="App-logo" alt="logo" />
                <Button onClick={getState}>Refresh state</Button>
                <div className="player-container">
                    <Player />
                </div>
            </div>
        </div>
    );
}

export default Dashbaord;