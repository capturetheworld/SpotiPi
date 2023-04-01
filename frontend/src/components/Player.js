import { React, useState } from 'react';
import 'react-seekbar-component/dist/index.css';
import SeekBar from 'react-seekbar-component';
import '../styles/player.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPause, faPlay, faForwardFast, faBackwardFast, faVolumeLow, faVolumeHigh } from "@fortawesome/free-solid-svg-icons";




const Player = (props) => {
    const [value, setValue] = useState(0);
    const [playing, setisPlaying] = useState(false);

    const togglePlaying = () => {
        setisPlaying((currValue) => !currValue);

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
                <button class="button button1"><FontAwesomeIcon icon={faBackwardFast} />
                </button>
                <button class="button button2" onClick={togglePlaying}>{playing ? <FontAwesomeIcon icon={faPause} /> : <FontAwesomeIcon icon={faPlay} />} </button>
                <button class="button button3"><FontAwesomeIcon icon={faForwardFast} /></button>
                <button class="button button4"><FontAwesomeIcon icon={faVolumeLow} /></button>
                <button class="button button5"><FontAwesomeIcon icon={faVolumeHigh} /></button>
            </div>

        </div>
    );
};

export default Player;