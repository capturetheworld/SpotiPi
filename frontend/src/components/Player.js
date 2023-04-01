import { React, useState } from 'react';
import 'react-seekbar-component/dist/index.css';
import SeekBar from 'react-seekbar-component';
import '../styles/player.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquare } from "@fortawesome/free-solid-svg-icons"





const Player = (props) => {
    const [value, setValue] = useState(0)


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
                <button class="button button1"><FontAwesome icon={faSquare} />
                </button>
                <button class="button button2">Play/Pause</button>
                <button class="button button3">Next</button>
                <button class="button button4">Volume Down</button>
                <button class="button button5">Volume Up</button>
            </div>

        </div>
    );
};

export default Player;