import React, { Component } from 'react';
import MainMenu from '../components/MainMenu/MainMenu';
import GameUI from '../components/GameUI/GameUI';
import library from '../lib/library';
import { DndProvider } from 'react-dnd';
import { TouchBackend } from 'react-dnd-touch-backend';
import Footer from '../components/Footer/Footer';


import './App.css';

const opts = {
    enableMouseEvents: true
}

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isCreatingGame: true,
            library: library,
            stageTypes: [
                {isSentenceStage: false},
                {isSentenceStage: false},
                {isSentenceStage: false},
                {isSentenceStage: false},
                {isSentenceStage: false},
            ]
        }
    }


    componentDidMount() {
        if (this.state.library) {
            this.setState({stagePhonics: this.state.library.gameLibrary.phonics});
        }
    
        // if ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        //     console.log('detected mobile, setting backend to touch');
            
        //     this.setState({backend: TouchBackend})
        // } else {
        //     console.log('setting backend to HTML5');
            
        //     this.setState({backend: HTML5Backend})
        // }
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
        const stagesArr = [...this.state.stageTypes];

        stagesArr[index].isSentenceRound = !stagesArr[index].isSentenceStage;

        console.log('toggled check @', index);

        this.setState({stageTypes: stagesArr});
    }

    render() {
        console.log('render');



        return (
            <DndProvider backend={TouchBackend} options={opts}>
            { this.state.isCreatingGame ? 
                <MainMenu
                    startGame={this.startGame}
                    library={this.state.library}
                    handleDrop={this.handleDrop}
                    stagePhonics={this.state.stagePhonics}
                    clicked={this.stagePhonicClickedHandler}
                    error={this.state.error}
                    errorInfo={this.state.errorInfo}
                    toggleStageCheckbox={this.toggleStageCheckbox}
                    mobile={this.state.mobile}
                >
                </MainMenu>
                :
                <GameUI
                    library={this.state.library}
                    stagePhonics={this.state.stagePhonics}
                    returnToMenu={this.returnToMenu}
                    stageTypes={this.state.stageTypes}
                ></GameUI>
            }
            <Footer/>
            </DndProvider>
        )
    }
}

export default App;