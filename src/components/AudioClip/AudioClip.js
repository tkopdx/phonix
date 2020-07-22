import React, { useRef } from 'react';
import "./AudioClip.css";

const AudioClip = props => {

    const playAudio = useRef(null);

    function handleClick() {
        playAudio.current.play();
    }

    
    return <div className="audio-clip-box">
        {props.audioURL ? <audio ref={playAudio} preload="auto" src={props.audioURL} type="audio/wav"/> : null}
        <button className="audio-clip-btn" onClick={props.clickable ? handleClick : null}><ion-icon name="volume-high-outline"></ion-icon></button>
    </div>
}

export default AudioClip;