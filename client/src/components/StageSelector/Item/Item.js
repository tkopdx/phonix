import React from 'react'
import { useDrag } from 'react-dnd'

import './Item.css';

const Item = props => {
  const [{isDragging}, drag] = useDrag({
    item: { type: props.phonic },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  })

  return (
    <div
      className="item"
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        backgroundColor: isDragging ? "white" : "#ffd32a",
        cursor: 'move'
      }}
    >
    {props.phonic}
    </div>
  )
}

export default Item;