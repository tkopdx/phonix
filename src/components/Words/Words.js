import React from 'react';

import "./Words.css";

const Words = props => {
    return <div className="words-box">
        {props.words.map((word, index) => <button className="word" onClick={() => props.clickWordHandler(word, index)}>{word}</button>)}
    </div>
}

export default Words;