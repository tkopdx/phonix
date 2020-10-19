import React from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';

const aboutOverlay = (
    <Popover id="popover-basic">
        <Popover.Title as="h3">
            Hey there!
        </Popover.Title>
        <Popover.Content>
            First off, thanks for checking out Phonix! <br></br>
            My name is Colin and I'm currently an Assistant Language Teacher in Hokkaido, Japan. I created Phonix to use with my English students, but I hope that you can find some use for it too. 
        </Popover.Content>
    </Popover>
)

const About = () => {
    return (
        <OverlayTrigger trigger="click" placement="auto" overlay={aboutOverlay}>
            <div className="footer-item">About</div>
        </OverlayTrigger>
    )
}

export default About;