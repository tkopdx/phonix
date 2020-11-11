import React from 'react'
import { useDrop } from 'react-dnd'

import './Dropzone.css';

const Dropzone = props => {

  const acceptableSymbols = [];

  props.library.symbolsList.map(symbol => {
    return acceptableSymbols.push(symbol.symbol);
  })
  
    const [{ isOver }, drop] = useDrop({
        accept: acceptableSymbols,
        drop: item => props.handleDrop(item.type, props.stage),
        collect: monitor => ({
            isOver: !!monitor.isOver(),
        }),
    });

  return (
    <div
      className="dropzone"
      ref={drop}
    > <div>+ drop</div>
      {isOver && (
        <div
          style={{
            position: 'absolute',
            top: '-2.5%',
            left: '-5%',
            height: '105%',
            width: '110%',
            zIndex: 0,
            opacity: 0.5,
            backgroundColor: 'white',
            borderRadius: `3px`
          }}
        ></div>
      )}
    </div>
  )
}

export default Dropzone;