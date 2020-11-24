import React from 'react';
import Stage from './Stage/Stage';
import StageBoxTopItem from './StageBoxTopItem/StageBoxTopItem';

import './StageSelector.css';

const StageSelector = props => {
    //TODO: change menu to only display 3 stages. Clicking on the stage plus button pulls up a modal with the items
    //TODO: add a way for user to change the number of words per round
        return (
        <div className="stages-box-outer">
            <div className="stages-box-top">
                <StageBoxTopItem
                    type={'stages'}
                    title={'Stages'}
                    increaseValueHandler={props.increaseValueHandler}
                    decreaseValueHandler={props.decreaseValueHandler}
                    value={props.stages.length}
                />
                <StageBoxTopItem
                    type={'wordsPerRound'}
                    title={'Words per round'}
                    increaseValueHandler={props.increaseValueHandler}
                    decreaseValueHandler={props.decreaseValueHandler}
                    value={props.numOfWordsPerRound}
                />
                <StageBoxTopItem
                    type={'lives'}
                    title={'Lives'}
                    increaseValueHandler={props.increaseValueHandler}
                    decreaseValueHandler={props.decreaseValueHandler}
                    value={props.lives}
                />
                <StageBoxTopItem
                    type={'difficulty'}
                    title={'Difficulty'}
                    increaseValueHandler={props.increaseValueHandler}
                    decreaseValueHandler={props.decreaseValueHandler}
                    value={props.difficulty}
                />
                <div className="stages-box-top-item-outer">
                <div className="stages-box-top-item-title">Stage timer (sec)</div>
                <div className="stages-box-top-item">
                    <input id='timer-input' onChange={(event) => props.setTimerHandler(event)} placeholder={props.timer}></input>
                </div>
                </div>
            </div>
        <div className="stages-box">
            {props.stages.map((stage, index) => {
                return <Stage
                    stage={index}
                    list={stage.phonics}
                    key={index}
                    library={props.library}
                    handleDrop={props.handleDrop}
                    clicked={props.clicked}
                    error={props.error}
                    errorInfo={props.errorInfo}
                    setStageType={props.setStageType}
                    stageType={stage.isSentenceStage}
                    displayModal={props.displayModal}
                />
            })}
        </div>
    </div>
    )
}


export default StageSelector;