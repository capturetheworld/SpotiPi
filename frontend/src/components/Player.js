import { React, useState, useContext } from 'react';
import 'react-seekbar-component/dist/index.css';
import SeekBar from 'react-seekbar-component';
import '../styles/player.css';
import AuthContext from "../context/AuthContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPause, faPlay, faForwardFast, faBackwardFast, faVolumeLow, faVolumeHigh } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import { Button } from "@mui/material";


const Player = (props) => {
    const [value, setValue] = useState(0);
    const [playing, setisPlaying] = useState(false);
    const { code, accessToken, setAccessToken, refreshToken, setRefreshToken, expiresIn, setExpiresIn } = useContext(AuthContext);

    const togglePlaying = () => {
        setisPlaying((currValue) => !currValue);

        console.log(accessToken)

        var activeDevice;

        axios.get(`http://localhost:8888/active_device`, {
            params: {
                access_token: accessToken
            }            
        }).then(function(response) {
            console.log(response.data);
            activeDevice  = response.data['active_device']

            if (playing) {
                axios.put('http://localhost:8888/pause', {
                    access_token: accessToken,
                    active_device: activeDevice,
                }).then(function(response){
                    console.log(response)
                })
            }
            else {
                axios.put('http://localhost:8888/play', {
                    access_token: accessToken,
                    active_device: activeDevice,
                }).then(function(response){
                    console.log(response)
                })
            }
        })
    }

    const nextTrack = () => {
        var activeDevice;

        axios.get(`http://localhost:8888/active_device`, {
            params: {
                access_token: accessToken
            }            
        }).then(function(response) {
            console.log(response.data);
            activeDevice  = response.data['active_device']
            axios.post('http://localhost:8888/next', {
                access_token: accessToken,
                active_device: activeDevice,
            }).then(function(response) {
                console.log(response);
            })
        })
    }

    const previousTrack = () => {
        var activeDevice;

        axios.get(`http://localhost:8888/active_device`, {
            params: {
                access_token: accessToken
            }            
        }).then(function(response) {
            console.log(response.data);
            activeDevice  = response.data['active_device']
            axios.post('http://localhost:8888/previous', {
                access_token: accessToken,
                active_device: activeDevice,
            }).then(function(response) {
                console.log(response);
            })
        })
    }




    return (
        <div>
            <SeekBar
                getNumber={setValue}
                width="100%"
                backgroundColor="gray"
                fillSecondaryColor="#16A085"
                fillColor="#93E9BE"
                headColor="black"
                headShadow="white"
                headShadowSize={6}
                progress={89}
            />
            <div className='button-container'>
                <button class="button button1" onClick={previousTrack}><FontAwesomeIcon icon={faBackwardFast} />
                </button>
                <button class="button button2" onClick={togglePlaying}>{playing ? <FontAwesomeIcon icon={faPause} /> : <FontAwesomeIcon icon={faPlay} />} </button>
                <button class="button button3" onClick={nextTrack}><FontAwesomeIcon icon={faForwardFast} /></button>
                <button class="button button4"><FontAwesomeIcon icon={faVolumeLow} /></button>
                <button class="button button5"><FontAwesomeIcon icon={faVolumeHigh} /></button>
            </div>

        </div>
    );
};

export default Player;