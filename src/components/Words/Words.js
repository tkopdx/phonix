import React from 'react';
import styled from 'styled-components';
import uniqid from 'uniqid';

import "./Words.css";

const StyledDiv = styled.div`
    .word {
        font-size: ${props => {
            if (props.leng <= 5) {
                return `7rem`;
            } else {
               return `${(50 / props.leng)}rem`}
            }            
        }
    }
`

const Words = props => {
    return <div key={'words-box'} className="words-box">
        {props.words.map((word, index) => <StyledDiv key={index} leng={word.length}>
            <button className="word" onClick={props.clickable ? () => props.clickWordHandler(word, index) : null}>{word}</button>
            </StyledDiv>
            )}
    </div>
}

export default Words;