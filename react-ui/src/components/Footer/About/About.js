import React from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';

const aboutOverlay = (
    <Popover id="popover-basic">
        <Popover.Title as="h3">
            Hey there!
        </Popover.Title>
        <Popover.Content>
            First off, thanks for checking out Phonix! <br></br>
            My name is Colin and I'm currently an English teacher in Hokkaido, Japan. I created Phonix to use with my English students, but I hope that you can find some use for it too. Please follow along at <a href="https://github.com/tkopdx/phonix">https://github.com/tkopdx/phonix</a> to learn about future updates or to copy the code for your own use. If you're looking for more games to use in your classroom, check out <a href="https://flipget.app">flipget.app</a>, a concentration-style matching game with online play.
        </Popover.Content>
    </Popover>
)

const About = () => {
    return (
        <OverlayTrigger trigger={['click', 'focus']} placement="auto" overlay={aboutOverlay}>
            <div className="footer-item">About</div>
        </OverlayTrigger>
    )
}

export default About;