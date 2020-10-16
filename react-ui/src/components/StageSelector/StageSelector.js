import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import Item from './Item/Item';
import Stage from './Stage/Stage';

import './StageSelector.css';

const StageSelector = props => {

    let backend;

    if (props.backend) {
        backend = TouchBackend
    } else {
        backend = HTML5Backend
    }

        return (
                <DndProvider backend={backend}>
                    <div className="items-box-outer">
                        <div className="items-box">
                            {props.library.symbolsList.map((phonic, index) => {
                                let phonemes = props.library.phonemesList[index];
                                let exampleWords = props.library.gameLibrary.wordLists[phonemes];
                                
                                return <Item
                                    phonic={phonic}
                                    key={index}
                                    phonemes={phonemes}
                                    exampleWords={exampleWords}
                                />
                            })}
                        </div>
                    </div>
                    <div className="stages-box">
                        <p className="explanation">Drag and drop items here to add to the possible phonics for each stage. One phonic will be randomly chosen. Click items in the list to delete them. Stages set to sentence play a sentence while other stages only play singular words.</p>
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
                                toggleStageCheckbox={props.toggleStageCheckbox}
                            />
                        }) : null}
                    </div>
                </DndProvider>
        )
}


export default StageSelector;