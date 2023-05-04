import React, { useState, useEffect, useContext, useRef } from "react";
import 'react-simple-keyboard/build/css/index.css';

import AuthContext from "../context/AuthContext";
import PlayerContext from "../context/PlayerContext";


//import Player_Premade from "../components/Player_Premade"
import Header from "../components/Header";
import TrackSearchResult from "../components/TrackSearchResults";
import axios from 'axios'
import SpotifyWebApi from "spotify-web-api-node";

import '../styles/dashboard.css'
import { useNavigate } from "react-router-dom";
import { List } from "@mui/material";
import Keyboard from 'react-simple-keyboard';

import Player from "../components/Player"



var spotifyApi = new SpotifyWebApi({
    clientId: axios.get("http://localhost:8888/apival"),
    clientSecret: axios.get("http://localhost:8888/apisecret")
});



function Dashbaord() {
    const { code, accessToken, setAccessToken, refreshToken, setRefreshToken, expiresIn, setExpiresIn } = useContext(AuthContext)
    const { track, setTrack } = useContext(PlayerContext)
    const [searchResults, setSearchResults] = useState([]);
    const [keyboardVisibility, setkeyboardVisibility] = useState(false)
    const [searchText, setSearchText] = useState('');
    const [playingTrack, setPlayingTrack] = useState();
    const [layout, setLayout] = useState("default");
    const keyboard = useRef();

    const showKeyboard = () => {
        setkeyboardVisibility(true);
    }

    const hideKeyboard = () => {
        setkeyboardVisibility(false);
    }

    let navigate = useNavigate();

    const kblayout = {
        'default': [
            '` 1 2 3 4 5 6 7 8 9 0 - = {bksp}',
            ' q w e r t y u i o p [ ] \\',
            ' a s d f g h j k l ; \' {enter}',
            '{shift} z x c v b n m , . / {shift}',
            'hide {space}'
        ],
        'shift': [
            '~ ! @ # $ % ^ &amp; * ( ) _ + {bksp}',
            ' Q W E R T Y U I O P { } |',
            ' A S D F G H J K L : " {enter}',
            '{shift} Z X C V B N M &lt; &gt; ? {shift}',
            'hide {space}'
        ]
    };


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
        }, (expiresIn - 60) * 1000)

        return () => clearInterval(interval)
    }, [refreshToken, expiresIn])

    function chooseTrack(track) {
        setTrack(track)
        setSearchText("")
    }
    const onChange = input => {
        setSearchText(input);
        console.log("Input changed", input);
    };

    const handleShift = () => {
        const newLayoutName = layout === "default" ? "shift" : "default";
        setLayout(newLayoutName);
    };

    const onKeyPress = button => {
        console.log("Button pressed", button);
        if (button === "{shift}" || button === "{lock}") handleShift();
        if (button === "hide") hideKeyboard();
    };

    const onChangeInput = event => {
        const input = event.target.value;
        setSearchText(input);
        keyboard.current.setSearchText(input);;
    };

    return (
        <div className="dash">
            <Header
                spotifyApi={spotifyApi}
                searchResults={searchResults}
                setSearchResults={setSearchResults}
                searchText={searchText}
                setSearchText={setSearchText}
                showKeyboard={showKeyboard}
                hideKeyboard={hideKeyboard}
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
                {keyboardVisibility && <div>
                    <Keyboard
                        keyboardRef={r => (keyboard.current = r)}
                        layoutName={layout}
                        layout={kblayout}
                        onChange={onChange}
                        onKeyPress={onKeyPress}
                        onFocus={showKeyboard}
                    />
                </div>}
            </div>
        </div>
    );
}

export default Dashbaord;