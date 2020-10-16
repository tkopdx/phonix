import React, { Component } from 'react';
import MainMenu from '../components/MainMenu/MainMenu';
import GameUI from '../components/GameUI/GameUI';
import library from '../lib/library';

import './App.css';

class App extends Component {
    state = {
        isCreatingGame: true,
        library: library,
        roundTypes: [
            {isSentenceRound: false},
            {isSentenceRound: false},
            {isSentenceRound: false},
            {isSentenceRound: false},
            {isSentenceRound: false},
        ]
    }

    componentDidMount() {
        if (this.state.library) {
            this.setState({stagePhonics: this.state.library.gameLibrary.phonics});
        }
    
        if ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
            console.log('detected mobile, setting backend to touch');
            
            this.setState({mobile: true})
        } else {
            console.log('setting backend to HTML5');
            
            this.setState({mobile: false})
        }
    }

    componentDidUpdate() {
        if (this.state.error) {
            this.resolveError();
        }
    }

    resolveError = () => {
        setTimeout(() => this.setState({error: null}), 1500);
    }

    startGame = () => {
        const phonicsArr = this.state.stagePhonics;

        const isNotReady = phonicsArr.findIndex(arr => {
            return arr.length < 1;
        });

        // console.log(isNotReady);

        if (isNotReady >= 0) {
            this.setState({
                error: 1,
                errorInfo: isNotReady
            });
            return;
        } else {
            // console.log('ready');
            this.setState({isCreatingGame: false});
        }
        
    }

    handleDrop = (phonic, stage) => {
        let phonicsArr;
        
        // console.log(phonic);
          
        phonicsArr = [...this.state.stagePhonics];

        const duplicateCheck = phonicsArr[stage].find(item => {
            return phonic === item;
        });

        if (duplicateCheck) {
            return;
        }

        phonicsArr[stage].push(phonic);

        this.setState({stagePhonics: phonicsArr});
  
        // console.log(`Pushed ${phonic} to ${this.state.library.gameLibrary.phonics[stage]}`);
    }

    stagePhonicClickedHandler = (stage, phonic) => {
        let phonicsArr;
        
        console.log(phonic);
          
        phonicsArr = [...this.state.stagePhonics];

        const delInd = phonicsArr[stage].findIndex(item => {
           return item === phonic;
        });

        phonicsArr[stage].splice(delInd, 1);

        // console.log(phonicsArr);

        this.setState({stagePhonics: phonicsArr});
    }

    returnToMenu = () => {
        this.setState({isCreatingGame: true});
    }

    toggleStageCheckbox = (index) => {
        const stagesArr = [...this.state.roundTypes];

        stagesArr[index].isSentenceRound = !stagesArr[index].isSentenceRound;

        console.log('toggled check @', index);

        this.setState({roundTypes: stagesArr});
    }

    render() {

        // console.log('render');
        return (
            this.state.isCreatingGame ? 
            <MainMenu
                startGame={this.startGame}
                library={this.state.library}
                handleDrop={this.handleDrop}
                stagePhonics={this.state.stagePhonics}
                clicked={this.stagePhonicClickedHandler}
                error={this.state.error}
                errorInfo={this.state.errorInfo}
                backend={this.state.mobile}
                toggleStageCheckbox={this.toggleStageCheckbox}
            >
            </MainMenu>
            :
            <GameUI
                library={this.state.library}
                stagePhonics={this.state.stagePhonics}
                returnToMenu={this.returnToMenu}
                roundTypes={this.state.roundTypes}
            ></GameUI>
        )
    }
}

export default App;