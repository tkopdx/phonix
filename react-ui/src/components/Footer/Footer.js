import React from 'react';
import Help from './Help/Help';
import About from './About/About';


import './Footer.css';

const Footer = props => {
    return (
        <div className="footer-box">
            <About/>
            <Help/>
        </div>
    )
}

export default Footer;