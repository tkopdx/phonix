import React from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';

const helpOverlay = (
    <Popover id="popover-footer">
        <Popover.Title as="h3">
            Looking for some help?
        </Popover.Title>
        <Popover.Content>
        Drag and drop items here to add to the possible phonics for each stage. One phonic will be randomly chosen. Click items in the list to delete them. Stages set to sentence play a sentence while other stages only play singular words.
        </Popover.Content>
    </Popover>
)


const Help = () => {
    return (
        <OverlayTrigger trigger={['click', 'focus']} placement="auto" overlay={helpOverlay}>
            <div className="footer-item">Help</div>
        </OverlayTrigger>
    )
}

export default Help;