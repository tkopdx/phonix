import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import Item from './Item/Item';
import Stage from './Stage/Stage';

import './StageSelector.css';

const StageSelector = props => {
    let backend;
    
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        console.log('detected mobile, setting backend to touch');
        
        backend = TouchBackend
    } else {
        console.log('setting backend to HTML5');
        
        backend = HTML5Backend
    }

        return (
                <DndProvider backend={backend}>
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