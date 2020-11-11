import React from 'react';
import Item from './Item/Item';
import Stage from './Stage/Stage';

import './StageSelector.css';

const StageSelector = props => {

        return (    <>
        <div className="items-box-outer">
            <div className="items-box">
                {props.library.symbolsList.map((phonic, index) => {
                    let phonemes = phonic.combinations;

                    return <Item
                        phonic={phonic.symbol}
                        key={index}
                        phonemes={phonemes}
                    />
                })}
            </div>
        </div>
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
                />
            }) : null}
        </div>
        </div>
        </>
        )
}


export default StageSelector;