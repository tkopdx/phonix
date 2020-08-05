import React, { Component } from 'react';
import MainMenu from '../components/MainMenu/MainMenu';
import GameUI from '../components/GameUI/GameUI';
import library from '../lib/library';

class App extends Component {
    state = {
        isCreatingGame: true,
        library: library
    }

    componentDidMount() {
        if (this.state.library) {
            this.setState({stagePhonics: this.state.library.gameLibrary.phonics});
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

        console.log(isNotReady);

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
        
        console.log(phonic);
          
        phonicsArr = [...this.state.stagePhonics];

        const duplicateCheck = phonicsArr[stage].find(item => {
            return phonic === item;
        });

        if (duplicateCheck) {
            return;
        }

        phonicsArr[stage].push(phonic);

        this.setState({stagePhonics: phonicsArr});
  
        console.log(`Pushed ${phonic} to ${this.state.library.gameLibrary.phonics[stage]}`);
    }

    stagePhonicClickedHandler = (stage, phonic) => {
        let phonicsArr;
        
        console.log(phonic);
          
        phonicsArr = [...this.state.stagePhonics];

        const delInd = phonicsArr[stage].findIndex(item => {
           return item === phonic;
        });

        phonicsArr[stage].splice(delInd, 1);

        console.log(phonicsArr);

        this.setState({stagePhonics: phonicsArr});
    }

    render() {

        console.log('render');
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
            >
            </MainMenu>
            :
            <GameUI
                library={this.state.library}
                stagePhonics={this.state.stagePhonics}
            ></GameUI>
        )
    }
}

export default App;