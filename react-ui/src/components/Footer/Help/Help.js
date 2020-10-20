import React from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';

const helpOverlay = (
    <Popover id="popover-footer">
        <Popover.Title as="h3">
            Looking for some help?
        </Popover.Title>
        <Popover.Content>
        Phonix is a phonics training game where each stage a phoneme from the stage list is randomly selected. An audio clip containing the keyword is played in each round. Players click the correct word to earn points and progress through the game. On this menu, you can drag and drop items to add to the possible phonemes for each stage. One phoneme will be randomly chosen. Click items in the list to delete them. Stages set to 'sentence' play a sentence while other stages only play singular words. During the game, words or sentences will be chosen randomly and autoplayed one time. Players can hear the audio clips again by clipping the sound icon in the topbar. The timer will stop while audio is loading or playing, so players aren't penalized for listening again. You can return to the main menu at anytime by clicking the menu button in the top left of the screen.
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