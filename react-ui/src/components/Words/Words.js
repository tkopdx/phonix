import React from 'react';
import styled from 'styled-components';

import "./Words.css";

const StyledDiv = styled.div`
    .word {
        font-size: ${props => {
            if (props.leng <= 5) {
                return `60px`;
            } else {
               return `${(300 / props.leng)}px`}
            }            
        }
    }
`

const Words = props => {
    return <div key={`words-box`} className="words-box">
        {props.words ? props.words.map((word, index) => <StyledDiv key={`${word.word}-${index}`} leng={word.word.length}>
            <button className="word" onClick={props.clickable ? () => props.clickWordHandler(word, index) : null}>{word.word}</button>
            </StyledDiv>
            ) : null}
    </div>
}

export default Words;