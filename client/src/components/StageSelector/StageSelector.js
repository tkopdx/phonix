import React from 'react';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Item from './Item/Item';
import Stage from './Stage/Stage';

import './StageSelector.css';

const StageSelector = props => {
        return (
                <DndProvider backend={HTML5Backend}>
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
                            />
                        }) : null}
                    </div>
                </DndProvider>
        )
}


export default StageSelector;