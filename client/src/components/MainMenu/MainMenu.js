import React from 'react';
import StageSelector from '../StageSelector/StageSelector';

import './MainMenu.css';

const MainMenu = props => {
    return (
        <div className='main-menu-box'>
            <div className="stage-menu-box">
                <div className="main-menu-title">Phonix</div>
                <StageSelector
                    library={props.library}
                    handleDrop={props.handleDrop}
                    stagePhonics={props.stagePhonics}
                    clicked={props.clicked}
                    error={props.error}
                    errorInfo={props.errorInfo}
                />
                <button onClick={() => props.startGame()} className="start-button"><p>Let's go!</p><ion-icon name="arrow-forward-outline"></ion-icon></button>
            </div>
        </div>
    )
    
}


export default MainMenu;