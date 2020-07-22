import React from 'react';
import Stopwatch from './Stopwatch/Stopwatch';

import './Topbar.css';

const Topbar = props => {
    
    return <div className="topbar-box">
        <div className="logo">Phonix</div>
        <div className="lives">
            <p><ion-icon name="heart-outline"></ion-icon><span>{props.lives}</span></p>
        </div>
        <div className="points">
            <ion-icon name="text-outline"></ion-icon>
            <span>{props.points}</span>
        </div>
        <div className="stage">
            <ion-icon name="ribbon-outline"></ion-icon>
            <span>{props.stage}-{props.round}</span>
        </div>
        <div className="time">
            <ion-icon name="alarm-outline"></ion-icon>
            <Stopwatch
                playing={props.playing}
                stageUp={props.stageUp}
                restart={props.resetTimer}
            />
        </div>
    </div>
}

export default Topbar;