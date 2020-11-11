import React from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import Dropzone from '../Dropzone/Dropzone';

import './Stage.css';

const Stage = props => {
    console.log('stage render');

    return (
        <div className={props.error && props.errorInfo === props.stage ? "stage-box-error" : "stage-box"}>
            <p>Stage {props.stage + 1}: </p>
            <div className="stage-box-flex-row">
                <div className="stage-phonic-list-box">
                {props.list.length > 0 ? props.list.map((item, index) => {
                    return <button className="phonics-button" onClick={() => props.clicked(props.stage, item)} key={index}>{item}</button>
                }) : null}
                <Dropzone
                    stage={props.stage}
                    library={props.library}
                    handleDrop={props.handleDrop}
                />
                </div>
                <DropdownButton className="flex-row-item" title={props.stageType ? 'Sentence' : 'Word'}>
                    <Dropdown.Item active={!props.stageType} onClick={() => props.setStageType(props.stage, false)} aria-label="When clicked, the round will use words.">Word</Dropdown.Item>
                    <Dropdown.Item active={props.stageType} onClick={() => props.setStageType(props.stage, true)} aria-label="When clicked, the round will use sentences.">Sentence</Dropdown.Item>
                </DropdownButton>
            </div>
        </div>
    )
}

export default Stage;