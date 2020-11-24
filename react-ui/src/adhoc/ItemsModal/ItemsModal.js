import React, { useState } from 'react';
import {Modal} from 'react-bootstrap';
import Items from './Items/Items';

const ItemsModal = props => {
    const [show, setShow] = useState(true);

    const handleClose = () => setShow(false);
    
    return (
        <Modal 
            show={show} 
            onHide={handleClose} 
            onExited={() => props.resolveModal()} 
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                Choosing words for stage {props.info + 1}
            </Modal.Header>
            <Modal.Body>
                Click items to add them to the stage list. Click them again to delete them.
                <Items
                    library={props.library}
                    clicked={props.clicked}
                    stage={props.info}
                    stagePhonics={props.stagePhonics}
                />
            </Modal.Body>
        </Modal>
    )
}

export default ItemsModal;