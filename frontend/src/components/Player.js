import { React, useState, useContext, useEffect } from 'react';
import 'react-seekbar-component/dist/index.css';
import SeekBar from 'react-seekbar-component';
import AuthContext from "../context/AuthContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPause, faPlay, faForwardFast, faBackwardFast, faVolumeLow, faVolumeHigh, faVolumeMute } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import { Slider, Stack, Button } from '@mui/material';
import '../styles/player.css';
import { styled } from '@mui/material/styles';
import Album from './Album';

const PrettoSlider = styled(Slider)({
    color: '#04aa6d',
    height: 8,
    '& .MuiSlider-track': {
        border: 'none',
    },
    '& .MuiSlider-thumb': {
        height: 24,
        width: 24,
        backgroundColor: '#eee',
        border: '2px solid currentColor',
        '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
            boxShadow: 'inherit',
        },
        '&:before': {
            display: 'none',
        },
    },
    '& .MuiSlider-markLabel': {
        color: '#eeeeee'
    },
});

const PlayerButton = styled(Button)({
    color: '#eee',
    height: 40,
    backgroundColor: '#04aa6d',
    borderRadius: '100px',
    marginLeft: '5px',
    marginRight: '5px'
});

const Player = (props) => {
    const [value, setValue] = useState(0);
    const [playingTrack, setPlayingTrack] = useState({
        songName: '',
        artistName: '',
        albumName: '',
        albumUrl: ''
    });
    const [marks, setMarks] = useState(
        [
            {
                value: 0,
                label: '0:00',
            },
            {
                value: 100,
                label: '0:00',
            },
        ]
    )
    const [volume, setVolume] = useState(1);
    const [playing, setisPlaying] = useState(false);
    const { code, accessToken, setAccessToken, refreshToken, setRefreshToken, expiresIn, setExpiresIn } = useContext(AuthContext);
    const [muteStyle, setmuteStyle] = useState(() => 'button');

    useEffect(() => {
        //getTrackData()
        // Calling this every second to get updated values, especially for seekbar
        const interval = setInterval(() => {
            getTrackData()
        }, 1000)

        return () => clearInterval(interval)
    }, [accessToken, value]);

    const getTrackData = () => {
        axios.get(`http://localhost:8888/state`, {
            params: {
                access_token: accessToken
            }
        }).then(function (res) {
            console.log(res.data);
            setisPlaying(res.data.is_playing)
            setPlayingTrack({
                songName: res.data.item.name,
                artistName: res.data.item.artists[0].name,
                albumName: res.data.item.album.name,
                albumUrl: res.data.item.album.images[0].url
            })
            setValue(res.data.progress_ms / res.data.item.duration_ms * 100)
            setMarks([
                {
                    value: 0,
                    label: millisToMinutesAndSeconds(res.data.progress_ms),
                },
                {
                    value: 100,
                    label: millisToMinutesAndSeconds(res.data.item.duration_ms),
                },
            ])
            console.log(res.data.progress_ms, res.data.item.duration_ms, parseInt(res.data.progress_ms / res.data.item.duration_ms * 100))
        })
    }

    function millisToMinutesAndSeconds(millis) {
        var minutes = Math.floor(millis / 60000);
        var seconds = ((millis % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }

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
                    //console.log(response)
                })
            }
            else {
                axios.put('http://localhost:8888/play', {
                    access_token: accessToken,
                    active_device: activeDevice,
                }).then(function (response) {
                    //console.log(response)
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
                //console.log(response);
                getTrackData()
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
                //console.log(response);
                getTrackData()
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

    return (
        <div className='page'>
            <Album
                album={playingTrack.albumName}
                albumImage={playingTrack.albumUrl}
                title={playingTrack.songName}
                artist={playingTrack.artistName}
            />
            <PrettoSlider
                aria-label="pretto slider"
                value={value}
                marks={marks}
            />
            <div  >
                <PlayerButton onClick={previousTrack} >
                    <FontAwesomeIcon icon={faBackwardFast} />
                </PlayerButton>
                <PlayerButton onClick={togglePlaying} >
                    {playing ? <FontAwesomeIcon icon={faPause} /> : <FontAwesomeIcon icon={faPlay} />}
                </PlayerButton>
                <PlayerButton onClick={nextTrack}>
                    <FontAwesomeIcon icon={faForwardFast} />
                </PlayerButton>
                <PlayerButton onClick={muteClick}>
                    <FontAwesomeIcon icon={faVolumeMute} />
                </PlayerButton>

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
            </div>
        </div >
    );
};

//   songName: 'THIS IS A SONG NAME',
// artistName: 'This is an artist name',
//     albumName: 'This is an artist name',

export default Player;