import React, { useRef } from 'react';
// import answerAudio from '../../assets/audio/output.mp3';
import Spinner from '../../../adhoc/Spinner/Spinner';
import "./AudioClip.css";

const AudioClip = React.memo(props => {

    // console.log('audioclip render');

    const playAudio = useRef(null);

    function handleClick() {
        playAudio.current.play();
    }

    if (props.audioURL) {
        playAudio.current.src = props.audioURL;
    }
    
    return <div className="audio-clip-box topbar-inner">
        <audio onPlay={() => props.setAudioStatus('play')} onPause={() => props.setAudioStatus('pause')} ref={playAudio} autoPlay={true} preload="auto" type="audio/mpeg"/>
        {props.loading ? <Spinner loading={props.loading}></Spinner> : <button className="audio-clip-btn" onClick={handleClick}><ion-icon name="volume-high-outline"></ion-icon></button>}
    </div>
})

export default AudioClip;