import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic, faRecordVinyl, faUser } from "@fortawesome/free-solid-svg-icons";


function Album({ albumImage, artist, title, album }) {
    return (
        <div className='albumContainer'>
            <div className='artContainer'>
                <img src={albumImage} className="art" alt="art" />

            </div>

            <div className='textContainer'>
                <div className='fieldContainer'>
                    <FontAwesomeIcon icon={faMusic} className="fa-lg" />
                    &nbsp;
                    <h5>{title}</h5>
                </div>
                <div className='fieldContainer'>
                    <FontAwesomeIcon icon={faUser} className="fa-lg" />
                    &nbsp;
                    <h5> {artist}</h5>
                </div>
                <div className='fieldContainer'>
                    <FontAwesomeIcon icon={faRecordVinyl} className="fa-lg" />
                    &nbsp;
                    <p>{album}</p>
                </div>
            </div>
        </div>
    )
}

export default Album;