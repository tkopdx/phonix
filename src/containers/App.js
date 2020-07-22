import React, { Component } from 'react';
import Hero from '../components/Hero/Hero';
import Words from '../components/Words/Words';
import AudioClip from '../components/AudioClip/AudioClip';
import Topbar from '../components/Topbar/Topbar';
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

const StyleDiv = styled.div`
  .back-div {
    backdrop-filter: none;
    transition: backdrop-filter 0.5s;
    height: 100vh;
    width: 100vw;
  }
`

// // Imports the Google Cloud client library
// const textToSpeech = require('@google-cloud/text-to-speech');

// // Import other required libraries
// const fs = require('fs');
// const util = require('util');
// // Creates a client
// const client = new textToSpeech.TextToSpeechClient();
// async function quickStart() {
//   // The text to synthesize
//   const text = 'hello, world!';

//   // Construct the request
//   const request = {
//     input: {text: text},
//     // Select the language and SSML voice gender (optional)
//     voice: {languageCode: 'en-US', ssmlGender: 'NEUTRAL'},
//     // select the type of audio encoding
//     audioConfig: {audioEncoding: 'MP3'},
//   };

//   // Performs the text-to-speech request
//   const [response] = await client.synthesizeSpeech(request);
//   // Write the binary audio content to a local file
//   const writeFile = util.promisify(fs.writeFile);
//   await writeFile('output.mp3', response.audioContent, 'binary');
//   console.log('Audio content written to file: output.mp3');
// }
// quickStart();

class App extends Component {
  constructor(props) {
    super(props);
    this.playSuccess = React.createRef();
    this.playFail = React.createRef();
    this.playStageUp = React.createRef();
    this.playGameOver = React.createRef();
  }

  state = {
    words: ['ham', 'ram'],
    answer: 'ham',
    points: 0,
    lives: 3,
    round: 1,
    stage: 1,
    phonic: 'am',
    numOfWordsPerRound: 2,
    playing: true,
    clickable: true
  }

  componentDidMount() {
    if (this.state.answer) {
      // console.log('mounted and called for speech');
      this.textToSpeechHandler();
    }
  }

  componentDidUpdate() {
    if (this.state.modal) {
      this.resolveModal();
    } else {
      // console.log('no answerAudio in state');
    }

    if (this.state.modal === 1) {
      this.playSuccess.current.play();
    }

    if (this.state.modal === 2) {
      this.playStageUp.current.play();
    }

    if (this.state.modal === 3) {
      this.playFail.current.play();
    }

    if (this.state.modal === 4) {
      this.playGameOver.current.play();
    }

    if (this.state.stageUp === true && !this.state.modal) {
      //stage up and new phonic
      this.setStage(); 
    }

    if (this.state.newPhonic === true) {
      this.displayNewWords();
    }
  }

  textToSpeechHandler = () => {

    // The text to synthesize
    let text = this.state.answer;

    //Build source URL
    let URL = `http://api.voicerss.org/?key=54cf3ebadf834eec917aaa848df2e5dd&hl=en-us&src=${text}`;

    this.setState({audioURL: URL});
  }

  clickWordHandler = (word, index) => {
    this.setState({clickable: false});
    if (word === this.state.answer) {
      this.correctAnswerHandler(index);
    } else {
      this.incorrectAnswerHandler(index);
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

    //get random new phonic
    leng = library.phonics.length;

    prevPhonic = this.state.phonic;

    do {
      num = Math.floor(Math.random() * leng);

      newPhonic = library.phonics[num];
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

    // this.displayNewWords();

  }

  gameOver = () => {
    this.setState({
      playing: false,
      modal: 4
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
      <Words
        key={this.state.transitionKey}
        words={this.state.words}
        clickWordHandler={this.clickWordHandler}
        clickable={this.state.clickable}
      />
      </CSSTransitionGroup>
      <AudioClip
        getTextToSpeech={this.textToSpeechHandler}
        audioURL={this.state.audioURL}
        clickable={this.state.clickable}
      />
      {this.state.modal ? <GameModal modal={this.state.modal}/> : null}
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
