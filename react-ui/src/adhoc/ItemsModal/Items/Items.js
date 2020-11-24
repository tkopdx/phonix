import React from 'react';
import Item from './Item/Item';

const Items = props => {
    return (
        <div className="items-box-outer">
            <div className="items-box">
                {props.library.symbolsList.map((phonic, index) => {
                    let phonemes = phonic.combinations;
                    return <Item
                        phonic={phonic.symbol}
                        key={index}
                        phonemes={phonemes}
                        clicked={props.clicked}
                        stage={props.stage}
                        isActive={props.stagePhonics.includes(phonic.symbol) ? true : false}
                    />
                })}
            </div>
        </div>
    )
}

export default Items;


