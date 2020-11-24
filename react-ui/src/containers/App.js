import React, { Component } from 'react';
import MainMenu from '../components/MainMenu/MainMenu';
import GameUI from '../components/GameUI/GameUI';
import library from '../lib/library';
import ItemsModal from '../adhoc/ItemsModal/ItemsModal';
import Footer from '../components/Footer/Footer';


import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isCreatingGame: true,
            library: library,
            stages: [
                {
                    phonics: [],
                    isSentenceStage: false,
                    words: []
                },
                {
                    phonics: [],
                    isSentenceStage: false,
                    words: []
                },
                {
                    phonics: [],
                    isSentenceStage: false,
                    words: []
                },
            ],
            timer: `30.0`,
            numOfWordsPerRound: 4,
            lives: 3,
            difficulty: 3
        }
    }


    componentDidMount() {
        // if (this.state.library) {
        //     this.setState({stagePhonics: this.state.library.gameLibrary.phonics});
        // }
    
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

    displayModal = (type, info) => {
        const modal = {
            type: type,
            info: info
        }
        
        this.setState({
            modal: modal
        })
    }

    resolveModal = () => {
        this.setState({modal: null})
    }

    resolveError = () => {
        setTimeout(() => this.setState({error: null}), 1500);
    }

    startGame = () => {
        
        
        const stages = this.state.stages;

        const isNotReady = () => {
            const arr = [];
            
            stages.map(stage =>{
                const res = stage.phonics.length > 0 ? true : false

                return arr.push(res);
            })

            return arr.includes(false) ? true : false;
        }

        if (isNotReady()) {
            const errorInfo = stages.findIndex(stage => {
                return stage.phonics.length < 1
            })

            return this.setState({
                error: 1,
                errorInfo: errorInfo
            });
        } else {
            // console.log('ready');
            this.setupWords();
            this.setState({isCreatingGame: false});
        }
        
    }

    setupWords = () => {
        const stages = [...this.state.stages];
    
        const lib = library.wordLibrary;
        
        stages.map((stage, index) => {
          return stage.phonics.map(symbol => {
            return lib.map(word => {
              return word.pronunciation.includes(symbol) ? stages[index].words.push(word) : null;
            })
          })
        })
    
        console.log(stages)
    
        return this.setState({stages: stages});
      }

    handleItemClick = (phonic, stage) => {
        let stagesArr, phonicsArr;
        
        // console.log(phonic);

        stagesArr = [...this.state.stages]
          
        phonicsArr = stagesArr[stage].phonics;

        const duplicateCheck = phonicsArr.find(item => {
            return phonic === item;
        });

        if (duplicateCheck) {
            return this.stagePhonicClickedHandler(stage, phonic);
        }

        phonicsArr.push(phonic);

        this.setState({stages: stagesArr});
  
        // console.log(`Pushed ${phonic} to ${this.state.library.gameLibrary.phonics[stage]}`);
    }

    stagePhonicClickedHandler = (stage, phonic) => {
        let stagesArr, phonicsArr;
        
        stagesArr = [...this.state.stages]
          
        phonicsArr = stagesArr[stage].phonics;

        const delInd = phonicsArr.findIndex(item => {
           return item === phonic;
        });

        phonicsArr.splice(delInd, 1);

        // console.log(phonicsArr);

        this.setState({stages: stagesArr});
    }

    returnToMenu = () => {
        this.setState({isCreatingGame: true});
    }

    setStageType = (index, type) => {
        const stages = [...this.state.stages];

        const curStage = stages[index];

        curStage.isSentenceStage = type;

        console.log('toggled check @', index);

        this.setState({stages: stages});
    }

    increaseValueHandler = type => {
        let value;

        if (type === 'stages' && this.state.stages.length < 10) {
            const stage = {
                phonics: [],
                isSentenceStage: false,
                words: []
            };
            
            value = [...this.state.stages];

            value.push(stage);

            this.setState({stages: value});
        } else if (type === 'wordsPerRound' && this.state.numOfWordsPerRound < 10) {
            value = this.state.numOfWordsPerRound + 1;
            
            this.setState({numOfWordsPerRound: value})
        } else if (type === 'lives' && this.state.lives < 10) {
            value = this.state.lives + 1;

            this.setState({lives: value});
        } else if (type === 'difficulty' && this.state.difficulty < 5) {
            value = this.state.difficulty + 1;

            this.setState({difficulty: value});
        }
    }

    decreaseValueHandler = type => {
        let value;

        if (type === 'stages' && this.state.stages.length > 1) {
            
            value = [...this.state.stages];

            value.splice(value.length - 1, 1);

            this.setState({stages: value});
        } else if (type === 'wordsPerRound' && this.state.numOfWordsPerRound > 2) {
            value = this.state.numOfWordsPerRound - 1;
            
            this.setState({numOfWordsPerRound: value})
        } else if (type === 'lives' && this.state.lives > 1) {
            value = this.state.lives - 1;
            
            this.setState({lives: value})
        } else if (type === 'difficulty' && this.state.difficulty > 1) {
            value = this.state.difficulty - 1;
            
            this.setState({difficulty: value})
        }
    }

    setTimerHandler = event => {
        return this.setState({timer: event.target.value});
    }

    render() {
        console.log('render');

        console.log(this.state.modal)

        return (<>
            {this.state.modal ? 
            <ItemsModal
                library={this.state.library}
                resolveModal={this.resolveModal}
                clicked={this.handleItemClick}
                info={this.state.modal.info}
                stagePhonics={this.state.stages[this.state.modal.info].phonics}
            />
            : 
            null }
            { this.state.isCreatingGame ? 
                <MainMenu
                    startGame={this.startGame}
                    clicked={this.stagePhonicClickedHandler}
                    error={this.state.error}
                    errorInfo={this.state.errorInfo}
                    setStageType={this.setStageType}
                    stages={this.state.stages}
                    mobile={this.state.mobile}
                    displayModal={this.displayModal}
                    timer={this.state.timer}
                    setTimerHandler={this.setTimerHandler}
                    numOfWordsPerRound={this.state.numOfWordsPerRound}
                    lives={this.state.lives}
                    difficulty={this.state.difficulty}
                    increaseValueHandler={this.increaseValueHandler}
                    decreaseValueHandler={this.decreaseValueHandler}
                >
                </MainMenu>
                :
                <GameUI
                    library={this.state.library}
                    returnToMenu={this.returnToMenu}
                    stages={this.state.stages}
                    lives={this.state.lives}
                    difficulty={this.state.difficulty}
                    timer={this.state.timer}
                    numOfWordsPerRound={this.state.numOfWordsPerRound}
                ></GameUI>
            }
            <Footer/>
            </>
        )
    }
}

export default App;