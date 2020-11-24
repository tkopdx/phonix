import React from 'react';
import Stopwatch from './Stopwatch/Stopwatch';
import AudioClip from './AudioClip/AudioClip';
import GameModal from '../../adhoc/GameModal/GameModal';

import './Topbar.css';

const Topbar = props => {

    console.log('topbar render');
    
    return <div className="topbar-box">
        <AudioClip
            audioURL={props.audioURL}
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
                playing={props.playing}
                timerState={props.timerState}
                gameOver={props.gameOver}
                timer={props.timer}
            />
        </div>
        <button onClick={() => props.returnToMenu()} className="back-button"><ion-icon name="arrow-back-outline"></ion-icon>Menu</button>
        {props.modal ? 
            <GameModal
                modal={props.modal}
            />
            : null
        }
        <div className="current-phonemes">{props.phonemesList}</div>
    </div>
}

export default Topbar;