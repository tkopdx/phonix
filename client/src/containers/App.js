import React, { Component } from 'react';
import Hero from '../components/Hero/Hero';
import Words from '../components/Words/Words';
import AudioClip from '../components/AudioClip/AudioClip';
import Topbar from '../components/Topbar/Topbar';
import ResultsModal from '../adhoc/ResultsModal/ResultsModal';
import library from '../lib/library';
import GameModal from '../adhoc/GameModal/GameModal';
import styled from 'styled-components';
import { CSSTransitionGroup } from 'react-transition-group';
import bell from '../assets/audio/bell.mp3';
import buzz from '../assets/audio/buzz.mp3';
import stageUp from '../assets/audio/stage-up.mp3';
import gameOver from '../assets/audio/game-over.mp3';
import uniqid from 'uniqid';
import './App.css';

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


class App extends Component {
  constructor(props) {
    super(props);
    this.playSuccess = React.createRef();
    this.playFail = React.createRef();
    this.playStageUp = React.createRef();
    this.playGameOver = React.createRef();
  }

  state = {
    points: 0,
    lives: 3,
    round: 1,
    stage: 0,
    numOfWordsPerRound: 2,
    playing: true,
    clickable: true,
    results: []
  }

  componentDidMount() {
    
    if (!this.state.phonic && !this.state.words && !this.state.answer) {
      this.setStage();
    }
    
    if (this.state.answer) {
      // console.log('mounted and called for speech');
      this.textToSpeechHandler();
    }
  }

  componentDidUpdate() {
    if (this.state.modal && !this.state.showResults) {
      console.log("cleaning modal");
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
      //stage up and new phonic
      this.setStage(); 
    }

    if (this.state.newPhonic === true) {
      this.displayNewWords();
    }

  }

  async textToSpeechHandler() {

    console.log('text to speech call');

    if (this.state.requestingSpeech) {
      return;
    }

    this.setState({requestingSpeech: true});

    const text = this.state.answer;

    this.setState({loading: true});
    try {
      const axiosRes = await axios.post('/texttospeech', {text: `${text}`});
      console.log(axiosRes);

      if (axiosRes.data.result === 'success') {
        console.log(axiosRes.data.result);
        this.setState({
          answerAudio: true,
          audioURL: axiosRes.data.audioURL,
          requestingSpeech: false
        });

      } else {
        this.setState({modal: 5});
        console.log(axiosRes);
      }
    } catch (err) {
      console.log(err);
      this.setState({modal: 5});
    }

    this.setState({loading: false});
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
    let stage, round, answer, clickedWord, res;

    clickedWord = word;
    stage = this.state.stage;
    round = this.state.round;
    answer = this.state.answer;

    if (this.state.results) {
      res = [...this.state.results];

      res.push({
        result: result,
        answer: answer,
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
        stageUp: true
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
            stageUp: true
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
    let stage, newPhonic, prevPhonic, num, leng;

    //stage up
    stage = this.state.stage + 1;

    if (stage >= 6) {
      console.log('ending game with success');
      this.setState({modal: null});
      this.displayResults();
      return;
    }

    //get random new phonic
    leng = library.phonics[stage].length;

    if (this.state.phonic) {
      prevPhonic = this.state.phonic;
    } else {
      prevPhonic = null;
    }

    do {
      num = Math.floor(Math.random() * leng);

      newPhonic = library.phonics[stage][num];
    } while (newPhonic === prevPhonic)

    this.setState({
      stage: stage,
      phonic: newPhonic,
      modal: 2,
      stageUp: false,
      newPhonic: true,
      resetTimer: false
    });

    console.log(`calling for new words with ${newPhonic}`);

  }

  gameOver = () => {
    this.setState({
      playing: false,
      modal: 4,
      clickable: false
    });
  }

  displayNewWords = () => {
    console.log(this.state.phonic);

    if (this.state.newPhonic) {
      this.setState({
        newPhonic: false
      });
    };
    
    let words, curWordsArray, nums, num, newWords, randAnsIndex, answer;

    words = library.wordLists;

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

    randAnsIndex = Math.floor(Math.random() * newWords.length);

    answer = newWords[randAnsIndex];

    console.log(newWords);

    setTimeout(() => this.setState({
      words: newWords,
      answer: answer,
      clickable: true,
      resetTimer: true,
      transitionKey: uniqid()
    }), 2000);

    setTimeout(() => this.textToSpeechHandler(), 2000);

  }

  displayResults = () => {
    console.log('cleaning up game');
    //end game
    this.setState({
      clickable: false,
      playing: false
    });
    //show results in a modal div
    console.log('displaying results');

    this.setState({showResults: true});
  }

  resolveModal = () => {
    setTimeout(() => this.setState({modal: null}), 1300);
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
        resetTimer={this.state.resetTimer}
        gameOver={this.gameOver}
      />
      <Hero
        animation={this.state.animateHero}
        heroMovement={this.state.heroMovement}
        clickable={this.state.clickable}
      />
      <CSSTransitionGroup
        transitionName="fade"
        transitionEnterTimeout={300}
        transitionLeaveTimeout={200}
      >
      {!this.state.showResults ? <Words
        key={this.state.transitionKey}
        words={this.state.words}
        clickWordHandler={this.clickWordHandler}
        clickable={this.state.clickable}
      /> 
      : null }
      </CSSTransitionGroup>
      <AudioClip
        getTextToSpeech={this.textToSpeechHandler}
        audioURL={this.state.audioURL}
        answerAudio={this.state.answerAudio}
        clickable={this.state.clickable}
        loading={this.state.loading}
      />
      {this.state.modal ? <GameModal modal={this.state.modal}/> : null}
      {this.state.showResults ? <ResultsModal results={this.state.results}/> : null}
      <audio ref={this.playSuccess} preload="auto" src={bell} type="audio/mpeg"/>
      <audio ref={this.playFail} preload="auto" src={buzz} type="audio/mpeg"/>
      <audio ref={this.playStageUp} preload="auto" src={stageUp} type="audio/mpeg"/>
      <audio ref={this.playGameOver} preload="auto" src={gameOver} type="audio/mpeg"/>
    </div>
    </StyleDiv>
    )
  }

}

export default App;
