import React from 'react';

import "./AudioClip.css";

const AudioClip = props => {

    let audio;
    
    if (props.audio) {
        audio = new Audio(`${props.audio}`);
        console.log('audio clip set in audioclip component');
    }
    
    return <div className="audio-clip-box">
        <button className="audio-clip-btn" onClick={props.audio ? audio.play() : null}><ion-icon name="volume-high-outline"></ion-icon></button>
    </div>
}

export default AudioClip;