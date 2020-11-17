import React from 'react';
// import Item from './Item/Item';
import Stage from './Stage/Stage';

import './StageSelector.css';

const StageSelector = props => {
    //TODO: change menu to only display 3 stages. Clicking on the stage plus button pulls up a modal with the items
    //TODO: add a way for user to change the number of words per round
        return (    <>
        <div className="stages-box-outer">
        <div className="stages-box">
            {props.stagePhonics ? props.stagePhonics.map((list, index) => {
                return <Stage
                    stage={index}
                    list={list}
                    key={index}
                    library={props.library}
                    handleDrop={props.handleDrop}
                    clicked={props.clicked}
                    error={props.error}
                    errorInfo={props.errorInfo}
                    setStageType={props.setStageType}
                    stageType={props.stageTypes[index].isSentenceStage}
                    displayModal={props.displayModal}
                />
            }) : null}
        </div>
        </div>
        </>
        )
}


export default StageSelector;