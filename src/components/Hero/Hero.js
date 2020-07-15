import React from 'react';

import "./Hero.css";

const Hero = props => {
        
        let movement, animation, className;

        className = 'hero-box';

        movement = props.heroMovement;
        animation = props.animation;

        if (animation) {
            switch (animation) {
                case 'c':
                    if (movement === 0) {
                        className = 'hero-box jump-correct';
                    } else {
                        className = 'hero-box walk-correct';
                    }
                    break;
                default:
                    if (movement === 0) {
                        className = 'hero-box jump-incorrect';
                    } else {
                        className = 'hero-box walk-incorrect';
                    }
            }
        }

        console.log(className);

    return <div className={className}>
            <img alt="hero" src="https://upload.wikimedia.org/wikipedia/en/1/19/Batman_%28circa_2016%29.png"></img>
        </div>
}

export default Hero;