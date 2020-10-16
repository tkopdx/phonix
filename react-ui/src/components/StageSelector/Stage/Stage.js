import React from 'react';
import { InputGroup } from 'react-bootstrap';
import Dropzone from '../Dropzone/Dropzone';

import './Stage.css';

const Stage = props => {
    return (
        <div className={props.error && props.errorInfo === props.stage ? "stage-box-error" : "stage-box"}>
            <p>Stage {props.stage + 1}: </p>
            <div className="stage-phonic-list-box">
            {props.list ? props.list.map((item, index) => {
                return <button className="phonics-button" onClick={() => props.clicked(props.stage, item)} key={index}>{item}</button>
            }) : null}
            <Dropzone
                stage={props.stage}
                library={props.library}
                handleDrop={props.handleDrop}
            />
            <InputGroup className="mb-3">
                <InputGroup.Text>Sentence?</InputGroup.Text>
                <InputGroup.Checkbox onChange={() => props.toggleStageCheckbox(props.stage)} aria-label="When clicked, the round will use sentences."/>
            </InputGroup>
            </div>
        </div>
    )
}

export default Stage;