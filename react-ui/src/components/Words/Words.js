import React from 'react';

import "./Words.css";


const Words = props => {
    return <div key={`words-box`} className="words-box">
        {props.words ? props.words.map((word, index) =>
            <button className="word" onClick={props.clickable ? () => props.clickWordHandler(word, index) : null}>{word.word}</button>
            ) : null}
    </div>
}

export default Words;