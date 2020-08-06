import React, { useRef, useState} from 'react'
import { useDrag } from 'react-dnd'
import { Popover, Overlay } from 'react-bootstrap';

import './Item.css';

const Item = props => {

  let phonemes, exampleWords;

  phonemes = props.phonemes;

  exampleWords = props.exampleWords;

  const exampleWordsList = (
    <div className="example-words-box">
      {exampleWords.map(word => {
        return <div>{word}</div>
      })}
    </div>
  )

  const [show, setShow] = useState(false);
  const target = useRef(null);
  
  const [{isDragging}, drag] = useDrag({
    item: { type: props.phonic },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  })

  return (
    <>
    <div className="item-box" ref={target}>
      <div
        className="item"
        ref={drag}
        style={{
          opacity: isDragging ? 0.5 : 1,
          backgroundColor: isDragging ? "white" : "#ffd32a",
          cursor: 'move'
        }}
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      >
      {props.phonic}
      </div>
    </div>
      <Overlay target={target.current} show={show} placement="right" props={props}>
      {({ placement, arrowProps, show: _show, popper, ...props }) => (
        <Popover
          id="popover-basic"
          {...props}
        >
          <Popover.Title as="h3">{phonemes}</Popover.Title>
            <Popover.Content>
              {exampleWordsList}
            </Popover.Content> 
        </Popover>
      )}
    </Overlay>
    </>
  )
}

export default Item;