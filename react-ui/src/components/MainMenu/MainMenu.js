import React from 'react';
import StageSelector from '../StageSelector/StageSelector';

import './MainMenu.css';

const MainMenu = props => {
    //TODO: add accordion help and about section

    const isReady = () => {
        const arr = [];

        props.stages.map(stage => {
            const res = stage.phonics.length > 0 ? true : false;

            return arr.push(res);
        })

        return arr.includes(false) ? false : true;
    }

    return (
        <div className='main-menu-box'>
            <div className="stage-menu-box">
                <div className="main-menu-title">Phonix</div>
                <StageSelector
                    library={props.library}
                    handleDrop={props.handleDrop}
                    stages={props.stages}
                    clicked={props.clicked}
                    error={props.error}
                    errorInfo={props.errorInfo}
                    backend={props.backend}
                    setStageType={props.setStageType}
                    displayModal={props.displayModal}
                    timer={props.timer}
                    setTimerHandler={props.setTimerHandler}
                    numOfWordsPerRound={props.numOfWordsPerRound}
                    lives={props.lives}
                    difficulty={props.difficulty}
                    increaseValueHandler={props.increaseValueHandler}
                    decreaseValueHandler={props.decreaseValueHandler}
                />
                <button onClick={() => props.startGame()} className={isReady() ? "start-button active" : "start-button"}>Let's go!<ion-icon name="arrow-forward-outline"></ion-icon></button>
            </div>
        </div>
    )
    
}


export default MainMenu;