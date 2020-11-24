import React from 'react';
import styled from 'styled-components';
// import bounceIn from 'react-animations/lib/bounce-in';
// import fadeOutDown from 'react-animations/lib/fade-out-down';

import './GameModal.css';

// const bounceAnimation = keyframes`${bounceIn}`;

// const fadeAnimation = keyframes`${fadeOutDown}`;

const StyleDiv = styled.div`
    left:${props => {
        if (props.modal === 2) {
            return `70%`;
        } else if (props.modal === 3) {
            return `30%`;
        } else {
            return `50%`;
        }
    }};
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
    
    return (
        <StyleDiv
            modal={props.modal}
            className="message-back"
        >
            <div className="message">{message}</div>
        </StyleDiv>
    ) 
}

export default GameModal;