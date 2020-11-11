import React from 'react'
import { useDrag } from 'react-dnd'
import { Popover, OverlayTrigger } from 'react-bootstrap';
import library from '../../../lib/library';

import './Item.css';

const Item = props => {

  let phonemes, exampleWords;

  phonemes = props.phonemes;

  exampleWords = [];
  let i = 0;

  do {
    library.wordLibrary.find(word => {
      // console.log(word.word);

      return word.pronunciation.includes(props.phonic) && !exampleWords.includes(word.word) ? exampleWords.push(word.word) : null;
    })

    i++
  } while (i < 5)
  
  // console.log(exampleWords);

  const exampleWordsList = (
    <div className="example-words-box">
      {exampleWords.map((word, index) => {
        return <div key={index}>{word}</div>
      })}
    </div>
  )

  const overlay = (
    <Popover id="popover-basic">
      <Popover.Title as="h3">{phonemes}</Popover.Title>
        <Popover.Content>
          {exampleWordsList}
        </Popover.Content> 
    </Popover>
  )
  
  const [{isDragging}, drag] = useDrag({
    item: { type: props.phonic },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  })

  return (
    <OverlayTrigger trigger={['hover', 'focus']} placement="auto" overlay={overlay}>
      <div className="item-box" key={props.phonic}>
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
      </div>
    </OverlayTrigger>
  )
}

export default Item;