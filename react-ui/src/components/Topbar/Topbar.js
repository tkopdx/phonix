import React from 'react';
import Stopwatch from './Stopwatch/Stopwatch';
import AudioClip from './AudioClip/AudioClip';

import './Topbar.css';

const Topbar = props => {
    
    return <div className="topbar-box">
        <AudioClip
            getTextToSpeech={props.getTextToSpeech}
            audioURL={props.audioURL}
            answerAudio={props.answerAudio}
            clickable={props.clickable}
            loading={props.loading}
            setAudioStatus={props.setAudioStatus}
        />
        <div className="lives topbar-inner">
            <div className="topbar-inner-item"><ion-icon name="fitness-outline"></ion-icon></div>
            <div className="topbar-inner-item">{props.lives}</div>
        </div>
        <div className="points topbar-inner">
            <div className="topbar-inner-item"><ion-icon name="happy-outline"></ion-icon></div>
            <div className="topbar-inner-item">{props.points}</div>
        </div>
        <div className="stage topbar-inner">
            <div className="topbar-inner-item"><ion-icon name="ribbon-outline"></ion-icon></div>
            <div className="topbar-inner-item">{props.stage}</div>
            <div className="topbar-inner-item">-</div>
            <div className="topbar-inner-item">{props.round}</div>
        </div>
        <div className="time topbar-inner">
            <div className="topbar-inner-item"><ion-icon name="alarm-outline"></ion-icon></div>
            <Stopwatch
                playing={props.playing && props.audioStatus === 'pause' && !props.loading ? true : false}
                stageUp={props.stageUp}
                restart={props.resetTimer}
                gameOver={props.gameOver}
                loading={props.loading}
            />
        </div>
    </div>
}

export default Topbar;