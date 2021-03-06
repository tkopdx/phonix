import React from 'react';

import "./ResultsModal.css";

const ResultsModal = props => {
    return (
        <div className="results-box">
            <div className="results-inner">
                {props.results.map(result => <div className={result.result ? "result-box" : "result-box-inc"} key={`${result.stage}-${result.round}`}>
                    <div className="result-title clearfix">
                        <div className="result-stage-round">{result.stage}-{result.round}</div>
                        {result.result ? 
                            <div className="result-icon-c"><ion-icon className="checkmark" name="checkmark-outline"></ion-icon></div> 
                            : <div className="result-icon-i"><ion-icon className="xmark" name="close-outline"></ion-icon></div>}
                    </div>
                    <div className="result-answer">Your audio hint was: {result.answer}</div>
                    <div className="choice-list">Your choices were:
                        {result.choices.map(choice => {
                            return <div className="choice-item">{choice.word}</div>
                        })}
                    </div>
                    <div className="result-clicked">You clicked: {result.clicked.word}</div>
                </div>)}
            </div>
        </div>
    )
}

export default ResultsModal;