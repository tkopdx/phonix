import React from 'react';
import styled, { keyframes } from 'styled-components';
import { bounceIn, fadeOutDown } from 'react-animations';

import './GameModal.css';

const bounceAnimation = keyframes`${bounceIn}`;

const fadeAnimation = keyframes`${fadeOutDown}`;

const StyleDiv = styled.div`
    .modal-back {
        margin:${props => {
            if (props.modal === 2) {
                return `0 auto 0 20%`;
            } else if (props.modal === 3) {
                return `0 auto 0 -20%`;
            } else {
                return `auto`;
            }
        }}
    }

    .message {
        animation: 1s ${bounceAnimation}, .3s ${fadeAnimation} 1 linear 1s;
    }
`

const GameModal = props => {
    
    let message;

    const messages = {
        1: 'Nice! +1',
        2: 'Next stage!',
        3: 'Oops! -1',
        4: 'Game over.',
        5: 'Server error. Try again.'
    }
    
    message = messages[props.modal];
    
    return <StyleDiv
        modal={props.modal}
    >
    {/* <div className="modal"> */}
        {/* <div className="modal-box"> */}
            <div className="modal-back">
                <div className="message">{message}</div>
            </div>
        {/* </div> */}
    {/* </div> */}
    </StyleDiv>
}

export default GameModal;