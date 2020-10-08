import React, { useRef } from 'react';
// import answerAudio from '../../assets/audio/output.mp3';
import Spinner from '../../adhoc/Spinner/Spinner';
import "./AudioClip.css";

const AudioClip = React.memo(props => {

    console.log('audioclip render');

    const playAudio = useRef(null);

    function handleClick() {
        playAudio.current.play();
    }

    if (props.audioURL) {
        playAudio.current.src = props.audioURL;
    }
    
    return <div className="audio-clip-box">
        <audio ref={playAudio} autoPlay={!props.loading && props.clickable ? true : false} preload="auto" type="audio/mpeg"/>
            <button className="audio-clip-btn" onClick={props.clickable ? handleClick : null}><ion-icon name="volume-high-outline"></ion-icon></button>
        <Spinner loading={props.loading}></Spinner>
    </div>
})

export default AudioClip;