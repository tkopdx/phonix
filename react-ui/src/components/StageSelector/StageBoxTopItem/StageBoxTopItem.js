import React from 'react';
import { Button } from 'react-bootstrap';

const StageBoxTopItem = props => {
    const type = props.type
    const value = props.value
    
    return (
        <div className="stages-box-top-item-outer">
            <div className="stages-box-top-item-title">{props.title}</div>
            <div className="stages-box-top-item">
                <Button onClick={() => props.decreaseValueHandler(type)}>-</Button>
                <div className="stages-box-top-item-display">{value}</div>
                <Button onClick={() =>props.increaseValueHandler(type)}>+</Button>
            </div>
        </div>
    )
}

export default StageBoxTopItem;