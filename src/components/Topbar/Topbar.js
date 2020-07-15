import React from 'react';
import Stopwatch from './Stopwatch/Stopwatch';

import './Topbar.css';

const Topbar = props => {
    
    return <div className="topbar-box">
        <div className="logo">Phonix</div>
        <div className="lives">
            <p><ion-icon name="heart-outline"></ion-icon>{props.lives}</p>
        </div>
        <div className="points"><ion-icon name="text-outline"></ion-icon>{props.points}</div>
        <div className="stage"><ion-icon name="ribbon-outline"></ion-icon>{props.stage}</div>
        <div className="time">
            <ion-icon name="alarm-outline"></ion-icon>
            <Stopwatch
                playing={props.playing}
            />
        </div>
    </div>
}

export default Topbar;