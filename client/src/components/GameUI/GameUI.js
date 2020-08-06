import React, { Component } from 'react';
import Hero from '../Hero/Hero';
import Words from '../Words/Words';
import AudioClip from '../AudioClip/AudioClip';
import Topbar from '../Topbar/Topbar';
import ResultsModal from '../../adhoc/ResultsModal/ResultsModal';
import GameModal from '../../adhoc/GameModal/GameModal';
import styled from 'styled-components';
import { CSSTransitionGroup } from 'react-transition-group';
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

        console.log('ind: ', ind);

        //find the phoneme list for each symbol index
        phonemes = this.props.library.phonemesList[ind];

        console.log('phonemes: ', phonemes);

        //push phoneme list to proper stage
        phonemesArr[index].push(phonemes);
      })

      console.log('phonemesArr: ', phonemesArr);

      this.setState({phonemesList: phonemesArr});
    })
    
    if (this.state.answer) {
      // console.log('mounted and called for speech');
      this.textToSpeechHandler();
    }
  }

  componentDidUpdate() {
    if (!this.state.phonic && !this.state.words && !this.state.answer && this.state.phonemesList) {
      this.setStage();
    }

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

    let text, answer, phonic;

    answer = this.state.answer;
    phonic = this.state.phonic;

    console.log('text to speech call');

    if (this.state.requestingSpeech) {
      return;
    }

    this.setState({requestingSpeech: true});

    if (this.state.stage <= 3) {
      text = answer;
    } else {
      text = this.props.library.gameLibrary.sentenceLists[phonic][answer];
    }
    

    this.setState({loading: true});
    try {
      const axiosRes = await axios.post('/texttospeech', {text: `${text}`});
      console.log(axiosRes);

      if (axiosRes.data.result === 'success') {
        console.log(axiosRes.data.result);
        
        if (this.state.audioURL) {
          this.setState({
            requestingSpeech: false
          });
        } else {
          this.setState({
            answerAudio: true,
            audioURL: axiosRes.data.audioURL,
            requestingSpeech: false
          });
        }
        
        

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
    let stage, round, text, clickedWord, res, phonic, answer;

    clickedWord = word;
    stage = this.state.stage;
    round = this.state.round;
    answer = this.state.answer;
    phonic = this.state.phonic;

    if (this.state.results) {
      res = [...this.state.results];

      if (stage <= 3) {
        text = answer;
      } else {
        text = this.props.library.gameLibrary.sentenceLists[phonic][answer];
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
    let stage, newPhonic, prevPhonic, num, leng, modal, phonemes;

    //stage up
    stage = this.state.stage + 1;

    //set phoneme list
    phonemes = this.state.phonemesList[stage - 1]

    if (stage >= 6) {
      console.log('ending game with success');
      this.setState({modal: null});
      this.displayResults();
      return;
    }

    //get random new phonic
    leng = phonemes.length;

    if (this.state.phonic) {
      prevPhonic = this.state.phonic;
    } else {
      prevPhonic = null;
    }

    do {
      num = Math.floor(Math.random() * leng);

      newPhonic = phonemes[num];
    } while (newPhonic === prevPhonic)

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

    this.displayResults();
  }

  displayNewWords = () => {
    console.log(this.state.phonic);
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

    if (this.state.results.length === 0) {
      return;
    }

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
      <button onClick={() => this.props.returnToMenu()} className="back-button"><ion-icon name="arrow-back-outline"></ion-icon><p>Menu</p></button>
    </div>
    </StyleDiv>
    )
  }

}

export default GameUI;
