import React, { Component } from 'react';
import Hero from '../Hero/Hero';
import Words from '../Words/Words';
import Topbar from '../Topbar/Topbar';
import ResultsModal from '../../adhoc/ResultsModal/ResultsModal';
import GameModal from '../../adhoc/GameModal/GameModal';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';
import bell from '../../assets/audio/bell.mp3';
import buzz from '../../assets/audio/buzz.mp3';
import stageUp from '../../assets/audio/stage-up.mp3';
import gameOver from '../../assets/audio/game-over.mp3';
import uniqid from 'uniqid';
import './GameUI.css';

//axios
const axios = require('axios').default;

const StyleDiv = styled.div`
  .back-div {
    backdrop-filter: none;
    transition: backdrop-filter 0.5s;
    height: 100vh;
    width: 100vw;
  }
`


class GameUI extends Component {
  constructor(props) {
    super(props);
    this.playSuccess = React.createRef();
    this.playFail = React.createRef();
    this.playStageUp = React.createRef();
    this.playGameOver = React.createRef();
    this.state = {
      points: 0,
      lives: 3,
      round: 1,
      stage: 0,
      numOfWordsPerRound: 2,
      playing: true,
      clickable: true,
      results: [],
      loading: true,
      timer: 'stop'
    }
  }

  componentDidMount() {

    let phonemesArr = [
      [],
      [],
      [],
      [],
      [],
    ];

    this.props.stagePhonics.forEach((list, index) => {
      //1:[a, b, c]
      list.forEach(symbol => {
        let ind, phonemes;
        
        //find the index for each symbol
        ind = this.props.library.symbolsList.findIndex(sym => {
          return symbol === sym;
        });

        // console.log('ind: ', ind);

        //find the phoneme list for each symbol index
        phonemes = this.props.library.phonemesList[ind];

        // console.log('phonemes: ', phonemes);

        //push phoneme list to proper stage
        phonemesArr[index].push(phonemes);
      })

      // console.log('phonemesArr: ', phonemesArr);

      this.setState({phonemesList: phonemesArr});
    })
    
    // if (this.state.answer) {
    //   console.log('mounted and called for speech');
    //   this.textToSpeechHandler();
    // }
  }

  componentDidUpdate() {
    if (!this.state.phonic && !this.state.words && !this.state.answer && this.state.phonemesList) {
      console.log('calling for first stage up!');
      this.setStage();
    }

    if (this.state.modal && !this.state.showResults) {
      // console.log("cleaning modal");
      this.resolveModal();
    }

    if (this.state.modal === 1) {
      this.playSuccess.current.volume = 0.2;
      this.playSuccess.current.play();
    }

    if (this.state.modal === 2) {
      this.playStageUp.current.volume = 0.2;
      this.playStageUp.current.play();
    }

    if (this.state.modal === 3) {
      this.playFail.current.volume = 0.2;
      this.playFail.current.play();
    }

    if (this.state.modal === 4) {
      this.playGameOver.current.volume = 0.2;
      this.playGameOver.current.play();
    }

    if (this.state.stageUp === true && !this.state.modal && this.state.playing) {
      // console.log('calling for a stage up!');
      //stage up and new phonic
      this.setStage(); 
    }

    if (this.state.newPhonic === true) {
      this.displayNewWords();
    }

  }

  async textToSpeechHandler() {

    this.setState({
      audioURL: null,
      loading: true
    })

    let text, answer, phonic;

    answer = this.state.answer;
    phonic = this.state.phonic;

    // console.log('text to speech call');

    if (this.state.requestingSpeech) {
      return;
    }

    this.setState({requestingSpeech: true});

    if (this.state.isSentenceRound) {
      text = this.props.library.gameLibrary.sentenceLists[phonic][answer];
    } else {
      text = answer;
    }
    

    try {
      const axiosRes = await axios.post('/texttospeech', {text: `${text}`});
      // console.log(axiosRes);

      if (axiosRes.data.result === 'success') {
        // console.log(axiosRes.data.result);
        
        this.setState({
          answerAudio: true,
          audioURL: axiosRes.data.audioURL,
          requestingSpeech: false,
        });

      } else {
        this.setState({
          modal: 5,
        });
        // console.log(axiosRes);
      }
    } catch (err) {
      // console.log(err);
      this.setState({
        modal: 5,
      });
    }

  }

  clickWordHandler = (word, index) => {
    let result;

    if (word === this.state.answer) {
      result = true;
    } else {
      result = false;
    }
    
    this.setState({clickable: false});
    if (result) {
      this.correctAnswerHandler(index);
    } else {
      this.incorrectAnswerHandler(index);
    }

    //push result to timeline
    let stage, round, text, clickedWord, res, phonic, answer;

    clickedWord = word;
    stage = this.state.stage;
    round = this.state.round;
    answer = this.state.answer;
    phonic = this.state.phonic;

    if (this.state.results) {
      res = [...this.state.results];

      if (this.state.isSentenceRound) {
        text = this.props.library.gameLibrary.sentenceLists[phonic][answer];
      } else {
        text = answer;
      }

      res.push({
        result: result,
        answer: text,
        clicked: clickedWord,
        stage: stage,
        round: round
      });

      this.setState({results: res});
    }
  }

  correctAnswerHandler = index => {

    //play good animation
      this.setState({
        animateHero: 'c',
        heroMovement: index,
      });
    
    //add points
    let prevPoints, newPoints, prevRound, newRound, stage;
    prevPoints = this.state.points;
    newPoints = prevPoints + 1;
    prevRound = this.state.round;
    
    if (prevRound >= 5) {
      newRound = 1;

      setTimeout(() => this.setState({
        points: newPoints,
        round: newRound,
        modal: 1,
        stageUp: true,
        timer: 'stop'
      }), 1500);
        
    } else {
      newRound = prevRound + 1;
      stage = this.state.stage;

      setTimeout(() => this.setState({
        points: newPoints,
        round: newRound,
        stage: stage,
        modal: 1
      }), 1500);

      //call for next words
      setTimeout(() => this.displayNewWords(), 1500);
    }
    
  }

  incorrectAnswerHandler = index => {

    //play bad animation
      this.setState({
        animateHero: 'inc',
        heroMovement: index
      });
    //resolve lives
      let prevLives, newLives, prevRound, newRound;
      prevLives = this.state.lives;
      newLives = prevLives - 1;

      if (newLives <= 0) {
        setTimeout(() => 
          this.setState({
            lives: newLives,
            modal: 3
          }), 1500);
        setTimeout(() => this.gameOver(), 1500);
      } else {
        prevRound = this.state.round;
        if (prevRound >= 5) {
          newRound = 1;

          setTimeout(() => this.setState({
            round: newRound,
            modal: 3,
            lives: newLives,
            stageUp: true,
            timer: 'stop'
          }), 1500);
          
        } else {
          newRound = prevRound + 1;

          setTimeout(() => this.setState({
            round: newRound,
            lives: newLives,
            modal: 3
          }), 1500);

          //call for next words 
          setTimeout(() => this.displayNewWords(), 1500);
        }
        
      }
  }

  setStage = () => {

    // console.log('setting stage start');
    let stage, newPhonic, prevPhonic, num, leng, modal, phonemes, isSentence;

    // console.log(this.state.stage)

    //set the next stage type or if no type, end the game
    if (this.props.stageTypes[this.state.stage]) {
      isSentence = this.props.stageTypes[this.state.stage].isSentenceRound;
    } else {
      this.setState({modal: null});
      this.displayResults();
      return;
    }

    //stage up
    stage = this.state.stage + 1;

    //set phoneme list
    phonemes = this.state.phonemesList[stage - 1];

    //get random new phonic
    leng = phonemes.length;

    if (this.state.phonic) {
      prevPhonic = this.state.phonic;
    } else {
      prevPhonic = null;
    }

    if (leng <= 1) {
      newPhonic = phonemes[0];
    } else {
      do {
        // console.log('in the setting stage loop')
        num = Math.floor(Math.random() * leng);
  
        newPhonic = phonemes[num];
      } while (newPhonic === prevPhonic)
    }

    if (stage === 1 && this.state.round === 1) {
      modal = null;
    } else {
      modal = 2;
    };

    this.setState({
      stage: stage,
      phonic: newPhonic,
      modal: modal,
      stageUp: false,
      newPhonic: true,
      timer: 'reset',
      isSentenceRound: isSentence
    });

    // console.log(`calling for new words with ${newPhonic}`);

  }

  gameOver = () => {
    this.setState({
      playing: false,
      modal: 4,
      clickable: false,
    });

    this.displayResults();
  }

  displayNewWords = () => {
    // console.log(this.state.phonic);
    // console.log(this.props.library.wordLists);

    if (this.state.newPhonic) {
      this.setState({
        newPhonic: false
      });
    };
    
    let words, curWordsArray, nums, num, newWords, randAnsIndex, answer;

    words = this.props.library.gameLibrary.wordLists;

    nums = [];
    newWords = [];
    
    setTimeout(() => this.setState({
      animateHero: null,
      heroMovement:null,
      answerAudio: null
    }), 1500);

    curWordsArray = words[this.state.phonic];

    do {
      let i;
      
      i = 0;

      do {
        num = Math.floor(Math.random() * curWordsArray.length);
      } while (nums.length > 0 ? num === nums[i] : null)

      nums.push(num);

      i++
    } while (nums.length < this.state.numOfWordsPerRound);

    nums.forEach(num => {
      newWords.push(curWordsArray[num]);
    })

    do {
      randAnsIndex = Math.floor(Math.random() * newWords.length);

      answer = newWords[randAnsIndex];
    } while (answer === this.state.answer)

    // console.log(newWords);

    setTimeout(() => this.setState({
      words: newWords,
      answer: answer,
      clickable: true,
      timer: 'stop',
      transitionKey: uniqid()
    }), 2000);

    setTimeout(() => this.textToSpeechHandler(), 2000);

  }

  displayResults = () => {
    // console.log('cleaning up game');
    //end game
    this.setState({
      clickable: false,
      playing: false
    });
    //show results in a modal div
    // console.log('displaying results');

    if (this.state.results.length === 0) {
      return;
    }

    this.setState({showResults: true});
  }

  resolveModal = () => {
    setTimeout(() => this.setState({modal: null}), 1300);
  }

  setAudioStatus = status => {
    console.log('setting audio status to:', status);
    
    if (status === 'pause') {
      this.setState({
        audioStatus:status,
        timer: 'start'
      })
    } else {
      console.log('audio playing, timer told to stop')

      this.setState({
        audioStatus: status,
        loading: false,
        timer: 'stop'
      })
    }
  }

  render = () => {
    return (
    <StyleDiv>
    <div className={!this.state.clickable ? "back-div" : "back-div-filter"}>
      <Topbar
        lives={this.state.lives}
        points={this.state.points}
        round={this.state.round}
        stage={this.state.stage}
        playing={this.state.playing}
        stageUp={this.state.stageUp}
        gameOver={this.gameOver}
        loading={this.state.loading}
        audioStatus={this.state.audioStatus}
        getTextToSpeech={this.textToSpeechHandler}
        audioURL={this.state.audioURL}
        answerAudio={this.state.answerAudio}
        clickable={this.state.clickable}
        setAudioStatus={this.setAudioStatus}
        timerState={this.state.timer}
      />
      <Hero
        animation={this.state.animateHero}
        heroMovement={this.state.heroMovement}
        clickable={this.state.clickable}
      />
      <CSSTransition
        in={!this.state.showResults ? true : null}
        classNames="fade"
        timeout={300}
      >
        <Words
          key={this.state.transitionKey}
          words={this.state.words}
          clickWordHandler={this.clickWordHandler}
          clickable={this.state.clickable}
        />
      </CSSTransition>
      {this.state.modal ? <GameModal modal={this.state.modal}/> : null}
      {this.state.showResults ? <ResultsModal results={this.state.results}/> : null}
      <audio ref={this.playSuccess} preload="auto" src={bell} type="audio/mpeg"/>
      <audio ref={this.playFail} preload="auto" src={buzz} type="audio/mpeg"/>
      <audio ref={this.playStageUp} preload="auto" src={stageUp} type="audio/mpeg"/>
      <audio ref={this.playGameOver} preload="auto" src={gameOver} type="audio/mpeg"/>
      <button onClick={() => this.props.returnToMenu()} className="back-button"><ion-icon name="arrow-back-outline"></ion-icon><p>Menu</p></button>
    </div>
    </StyleDiv>
    )
  }

}

export default GameUI;
