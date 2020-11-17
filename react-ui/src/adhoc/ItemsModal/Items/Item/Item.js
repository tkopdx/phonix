import React from 'react'
import { Popover, OverlayTrigger, Button } from 'react-bootstrap';
import library from '../../../../lib/library';

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

  return (
    <OverlayTrigger trigger={['hover', 'focus']} placement="auto" overlay={overlay}>
        <Button variant="primary" style={{backgroundColor: props.isActive ? '#d83a00' : '#ff7f50', border: 'none'}} active={props.isActive} onClick={() => props.clicked(props.phonic, props.stage)}>
          {props.phonic}
        </Button>
    </OverlayTrigger>
  )
}

export default Item;