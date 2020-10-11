import React from 'react'
import { useDrop } from 'react-dnd'

import './Dropzone.css';

const Dropzone = props => {
  
    const [{ isOver }, drop] = useDrop({
        accept: props.library.symbolsList,
        drop: item => props.handleDrop(item.type, props.stage),
        collect: monitor => ({
            isOver: !!monitor.isOver(),
        }),
    });

  return (
    <div
      className="dropzone"
      ref={drop}
    > + drop
      {isOver && (
        <div
          style={{
            position: 'absolute',
            top: '-5%',
            left: '-15%',
            height: '110%',
            width: '130%',
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