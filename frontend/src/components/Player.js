import { React, useState, useContext, useEffect } from 'react';
import 'react-seekbar-component/dist/index.css';
import SeekBar from 'react-seekbar-component';
import '../styles/player.css';
import AuthContext from "../context/AuthContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPause, faPlay, faForwardFast, faBackwardFast, faVolumeLow, faVolumeHigh, faVolumeMute } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import { Slider, Stack } from '@mui/material';
import albumart from '../pictures/01.png';


const Player = (props) => {
    const [value, setValue] = useState(0);
    const [info, setInfo] = useState(() => {
        return {
            songName: 'THIS IS A SONG NAME',
            artistName: 'This is an artist name',
            albumName: 'This is an album name',
        };
    });
    const [volume, setVolume] = useState(1);
    const [playing, setisPlaying] = useState(false);
    const { code, accessToken, setAccessToken, refreshToken, setRefreshToken, expiresIn, setExpiresIn } = useContext(AuthContext);

    const [muteStyle, setmuteStyle] = useState(() => 'button');

    const togglePlaying = () => {
        setisPlaying((currValue) => !currValue);

        console.log(accessToken)

        var activeDevice;

        axios.get(`http://localhost:8888/active_device`, {
            params: {
                access_token: accessToken
            }
        }).then(function (response) {
            console.log(response.data);
            activeDevice = response.data['active_device']

            if (playing) {
                axios.put('http://localhost:8888/pause', {
                    access_token: accessToken,
                    active_device: activeDevice,
                }).then(function (response) {
                    console.log(response)
                })
            }
            else {
                axios.put('http://localhost:8888/play', {
                    access_token: accessToken,
                    active_device: activeDevice,
                }).then(function (response) {
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
        }).then(function (response) {
            console.log(response.data);
            activeDevice = response.data['active_device']
            axios.post('http://localhost:8888/next', {
                access_token: accessToken,
                active_device: activeDevice,
            }).then(function (response) {
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
        }).then(function (response) {
            console.log(response.data);
            activeDevice = response.data['active_device']
            axios.post('http://localhost:8888/previous', {
                access_token: accessToken,
                active_device: activeDevice,
            }).then(function (response) {
                console.log(response);
            })
        })
    }


    const muteClick = () => {
        console.log('mute button clicked');
        if (muteStyle === 'button') {
            setmuteStyle(() => 'buttonMute');
        }
        else {
            setmuteStyle(() => 'button');
        }

    };

    useEffect(() => {
        console.log(value);
    }, [value]);




    return (
        <div className='page'>
            <SeekBar
                getNumber={setValue}
                width="100%"
                backgroundColor="gray"
                fillSecondaryColor="#16A085"
                fillColor="#93E9BE"
                headColor="black"
                headShadow="white"
                headShadowSize={6}
                progress={value}
            />
            <div className='button-container'>
                <button class="button button1" onClick={previousTrack}><FontAwesomeIcon icon={faBackwardFast} />
                </button>
                <button class="button button2" onClick={togglePlaying}>{playing ? <FontAwesomeIcon icon={faPause} /> : <FontAwesomeIcon icon={faPlay} />} </button>
                <button class="button button3" onClick={nextTrack}><FontAwesomeIcon icon={faForwardFast} /></button>
                <button className={muteStyle} onClick={muteClick}><FontAwesomeIcon icon={faVolumeMute} /></button>

            </div>
            <div className='soundContainer'>
                <Stack className='soundItems' spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                    <FontAwesomeIcon icon={faVolumeLow} />
                    <Slider
                        className="soundSlider"
                        sx={{
                            width: 300,
                            color: 'white',

                        }}
                        aria- label="Volume"
                        value={volume}
                        onChange={
                            (e) => setVolume(e.target.value)}
                    />
                    <FontAwesomeIcon icon={faVolumeHigh} />
                </Stack>

            </div>
            <div className='albumContainer'>
                <div className='artContainer'>
                    <img src={albumart} className="art" alt="art" />

                </div>

                <div className='textContainer'>
                    <b>{info.songName}</b>
                    <br></br>
                    {info.artistName}
                    <br></br>
                    {info.albumName}

                </div>
            </div>

        </div >
    );
};

//   songName: 'THIS IS A SONG NAME',
// artistName: 'This is an artist name',
//     albumName: 'This is an artist name',

export default Player;