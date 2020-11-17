import React from 'react'

import './AddItemBtn.css';

const Dropzone = props => {

  return (
    <button className="add-item-btn" onClick={() => props.displayModal('items', props.stage)}>
      +
    </button>
  )
}

export default Dropzone;