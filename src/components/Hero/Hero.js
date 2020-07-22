import React from 'react';
import styled from 'styled-components';

import "./Hero.css";

const StyleDiv = styled.div`
    .no-filter {
        filter: none;
        transition: filter 0.5s;
    }
`

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

        // console.log(className);

    return <StyleDiv>
        <div className={className}>
            <img className={!props.clickable ? "no-filter" : null} alt="hero" src="https://upload.wikimedia.org/wikipedia/en/1/19/Batman_%28circa_2016%29.png"></img>
        </div>
        </StyleDiv>
}

export default Hero;