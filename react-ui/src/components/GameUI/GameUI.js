import React, { Component } from 'react';
// import Hero from '../Hero/Hero';
import Words from '../Words/Words';
import Topbar from '../Topbar/Topbar';
import ResultsModal from '../../adhoc/ResultsModal/ResultsModal';
// import GameModal from '../../adhoc/GameModal/GameModal';
import styled from 'styled-components';
// import { CSSTransition } from 'react-transition-group';
import bell from '../../assets/audio/bell.mp3';
import buzz from '../../assets/audio/buzz.mp3';
import stageUp from '../../assets/audio/stage-up.mp3';
import gameOver from '../../assets/audio/game-over.mp3';
import uniqid from 'uniqid';
import { v4 as uuidv4 } from 'uuid';
import './GameUI.css';
import library from '../../lib/library';
import difficulty from '../../lib/difficulty';

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
      livesLost: 0,
      round: 1,
      stage: -1,
      // numOfWordsPerRound: 4,
      playing: true,
      clickable: true,
      results: [],
      loading: true,
      timer: 'stop',
      id: null
    }
  }

  componentDidMount() {

    this.setStage();
    
    // if (this.state.answer) {
    //   console.log('mounted and called for speech');
    //   this.textToSpeechHandler();
    // }

    const id = uuidv4();

    this.setState({id: id});
  }

  componentDidUpdate() {
    // if (!this.state.phonic && !this.state.words && !this.state.answer && this.state.phonemesList) {
    //   console.log('calling for first stage up!');
    //   this.setStage();
    // }

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

  componentWillUnmount = () => {
    axios.post('/delete', {id: this.state.id});
  }

  async textToSpeechHandler() {

    this.setState({
      audioURL: null,
      loading: true
    })

    let text, answer;

    answer = this.state.answer;
    // phonic = this.state.phonic;

    // console.log('text to speech call');

    if (this.state.requestingSpeech) {
      return;
    }

    this.setState({requestingSpeech: true});

    if (this.state.isSentenceStage) {
      text = answer.sentenceSentToAPI;
    } else {
      text = answer.word;
    }
    

    try {
      const axiosRes = await axios.post('/texttospeech', {text: `${text}`, id: this.state.id});
      // console.log(axiosRes);

      if (axiosRes.data.result === 'success') {
        // console.log(axiosRes.data.result);

        const URL = '/assets/' + this.state.id
        
        this.setState({
          answerAudio: true,
          audioURL: URL,
          requestingSpeech: false,
        });

        // const audio = await axios.get('/assets/' + this.state.id, {
        //   // params: {
        //   //   id: this.state.id
        //   // }
        // });

        console.log('got audio!');

        // document.getElementById('audio-clip').src = audio;

      } else {
        this.setState({
          modal: 5,
        });
        // console.log(axiosRes);
      }
    } catch (err) {
      console.log(err);
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
    
    this.setState({
      clickable: false,
      timer: 'stop'
    });
    
    if (result) {
      this.correctAnswerHandler(index);
    } else {
      this.incorrectAnswerHandler(index);
    }

    //push result to timeline
    let stage, round, text, clickedWord, res, answer, choices;

    clickedWord = word;
    stage = this.state.stage + 1;
    round = this.state.round;
    answer = this.state.answer;
    choices = this.state.words;

    if (this.state.results) {
      res = [...this.state.results];

      if (this.state.isSentenceStage) {
        text = answer.sentenceSentToAPI;
      } else {
        text = answer.word;
      }

      res.push({
        result: result,
        choices: choices,
        answer: text,
        clicked: clickedWord,
        stage: stage,
        round: round
      });

      //add words to previously used words array to avoid duplicates in the same round
      let prevWords = [];
      
      if (this.state.prevWords) {
        prevWords = [...this.state.prevWords]
      }

      this.state.words.map(word => {
        return prevWords.push(word);
      })

      this.setState({
        results: res,
        prevWords: prevWords
      });
    }
  }

  correctAnswerHandler = index => {
    
    //add points
    let prevPoints, newPoints, prevRound, newRound, stage, stageUp;
    prevPoints = this.state.points;
    newPoints = prevPoints + 1;
    prevRound = this.state.round;
    
    if (prevRound >= 5) {
      newRound = prevRound;
      // timer = 'stop'
      stage = this.state.stage;
      stageUp = true;

      // setTimeout(() => this.setState({
      //   points: newPoints,
      //   round: newRound,
      //   modal: 1,
      //   stageUp: true,
      //   timer: 'stop'
      // }), 1000);
        
    } else {
      newRound = prevRound + 1;
      stage = this.state.stage;
      stageUp = false;
      // timer=this.state.timer;

      // setTimeout(() => this.setState({
      //   points: newPoints,
      //   round: newRound,
      //   stage: stage,
      //   modal: 1
      // }), 1000);

      //call for next words
      setTimeout(() => this.displayNewWords(), 1000);
    }

    setTimeout(() => this.setState({
      points: newPoints,
      round: newRound,
      modal: 1,
      stage:stage,
      stageUp: stageUp,
      // timer: timer
    }), 500);
    
  }

  incorrectAnswerHandler = index => {

    //resolve lives
      let prevLivesLost, newLivesLost, lives, prevRound, newRound, stageUp;
      lives = this.props.lives;
      prevLivesLost = this.state.livesLost;
      newLivesLost = prevLivesLost + 1;

      if (lives <= newLivesLost) {
        setTimeout(() => this.gameOver(), 1000);
      } else {
        prevRound = this.state.round;
        if (prevRound >= 5) {
          newRound = prevRound;
          stageUp = true;
          // timer = 'stop';

          // setTimeout(() => this.setState({
          //   round: newRound,
          //   modal: 3,
          //   lives: newLives,
          //   stageUp: true,
          //   timer: 'stop'
          // }), 1000);
          
        } else {
          newRound = prevRound + 1;
          // timer = this.state.timer;
          stageUp = false;

          // setTimeout(() => this.setState({
          //   round: newRound,
          //   lives: newLives,
          //   modal: 3
          // }), 1000);

          //call for next words 
          setTimeout(() => this.displayNewWords(), 1000);
        }
        
      }

      setTimeout(() => 
          this.setState({
            livesLost: newLivesLost,
            modal: 3,
            round: newRound,
            stageUp: stageUp,
            // timer: timer
      }), 500);
  }

  setStage = () => {

    // console.log('setting stage start');
    let modal, isSentence, stages, nextStage, stageIndex;
    

    stages = this.props.stages;

    stageIndex = this.state.stage + 1;

    nextStage = stages[stageIndex];

    // console.log(this.state.stage)

    //set the next stage type or if no type, end the game
    if (nextStage) {
      isSentence = nextStage.isSentenceStage;
    } else {
      this.setState({modal: null});
      this.displayResults();
      return;
    }

    if (stageIndex === 1 && this.state.round === 1) {
      modal = null;
    } else {
      modal = 2;
    };

    this.setState({
      stage: stageIndex,
      round: 1,
      modal: modal,
      stageUp: false,
      newPhonic: true,
      timer: 'reset',
      isSentenceStage: isSentence,
      prevWords: []
    });

  }

  gameOver = () => {
    this.setState({
      playing: false,
      modal: 4,
      clickable: false,
      timer: 'stop'
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
    
    let words, num, newWords, randAnsIndex, answer, numOfWordsPerRound, dif;

    dif = difficulty[this.props.difficulty];
    words = this.props.stages[this.state.stage].words;
    numOfWordsPerRound = this.props.numOfWordsPerRound;
    newWords = [];
    
    setTimeout(() => this.setState({
      animateHero: null,
      heroMovement:null,
      answerAudio: null
    }), 1500);

    // curWordsArray = words[this.state.phonic];

    do {
      randAnsIndex = Math.floor(Math.random() * words.length);

      answer = words[randAnsIndex];

    } while ((this.duplicate(answer, this.state.prevWords)) || (this.state.isSentenceStage ? answer.sentences.length < 1 : false) || answer.word.length > dif.maxWordLength) 

    if (this.state.isSentenceStage) {
      //TODO:request example sentence from API for words without sentences or get a new answer word
      const num = Math.floor(Math.random() * answer.sentences.length);
      answer.sentenceSentToAPI = answer.sentences[num];

      console.log(answer);
    }

    newWords.push(answer);

    const relatedWords = [];
    // arr = [l, r, u]
    const pronunciationArr = answer.pronunciation.split('');
    //word needs to include all minus one of the items in arr
    //so, l and r or l and u or r and u

    console.log(pronunciationArr);

    //pull all related words from library and test them based on pronunciation
    //words with similar pronunciation are pushed to related words
    library.wordLibrary.map(word=> {
      //skip over duplicates of the answer
      if (word.word === answer.word || word.pronunciation === answer.pronunciation || word.word.length > dif.maxWordLength) {
        return null;
      }
      
      let minContain = pronunciationArr.length - 1;

      let similarLength = Math.abs(word.pronunciation.length - answer.pronunciation.length) <= 2 ? true : false;
      
      let contains = 0;
      let containsSameOrder = 0;

      let i = 0;

      do {
        if (word.pronunciation.includes(pronunciationArr[i])) {
          contains++
        }

        i++
      } while (i < pronunciationArr.length)

      //do a preliminary check
      //if word has enough contains and is a similar length, it can continue to the next check otherwise we toss it from consideration
      if (contains < minContain || !similarLength) {
        return null;
      };

      // x = 7
      let x = 0;

      //test word relation based on substrings and order
      do {
        //arr = [a, b, c, d, e, f, g]
        //Does word include 50% of pronunciationArr in the same order? (i.e, includes abcd or bcde or cdef or defg)  

        const start = x;
        const end = Math.ceil((pronunciationArr.length * dif.relatedPercent ) + x);
        // 7 / 2 is 3.5 plus 0 is 3.5 and then rounded up to 4, thereby slicing from index 0 to 4, not include
        //returns the characters from index 0 to 3 and joins them to make string 'abcd'

        const testString = pronunciationArr.slice(start, end).join('');

        if (word.pronunciation.includes(testString)) {
          // console.log(`${word.word} contains the substring`);
          containsSameOrder++
        }

        x++
      } while (x < 2)

      //the more 'same orders' a word has, the more times it will be pushed into the related words array, thereby increasing probability of being randomly chosen
      do {
        if (containsSameOrder) {
          // console.log(`pushing ${word.word} extra times`)
          relatedWords.push(word)
          containsSameOrder--
        }
      } while (containsSameOrder)

      return null;

      // console.log(`${word.word} in relation to ${answer.word}:`, 'contains: ', contains, 'similarLength: ', similarLength, 'minContain: ', minContain);
    })

    console.log(`found these words related to ${answer.word}:`, relatedWords);

    if (relatedWords.length <= numOfWordsPerRound) {
      return this.displayNewWords();
    }
    // const wordsArr = relatedWords.length <= numOfWordsPerRound ? words : relatedWords;
    const wordsArr = relatedWords;
    

    do {
      console.log('entered random number loop')

      num = Math.floor(Math.random() * wordsArr.length);
      
      if ((this.state.isSentenceStage ? !this.checkIfRandomWordIsInAnswer(wordsArr[num], answer) : true) && !this.duplicate(wordsArr[num], this.state.prevWords) && !this.duplicate(wordsArr[num], newWords)) {
        newWords.push(wordsArr[num]);
      }

    } while (newWords.length < numOfWordsPerRound);

    console.log(newWords);

    newWords = this.shuffle(newWords);

    console.log(newWords);

    setTimeout(() => this.setState({
      words: newWords,
      answer: answer,
      clickable: true,
      timer: 'stop',
      transitionKey: uniqid()
    }), 2000);

    setTimeout(() => this.textToSpeechHandler(), 2000);

  }

  duplicate = (item, array) => {
    console.log('duplicate?', item, array);
    if (array) {
      // const prevWords = this.state.prevWords;
      const arr = [];
      array.map( word => {
        return word.word === item.word ? arr.push(true) : arr.push(false)
      })
      return arr.includes(true) ? true : false
    } else {
      return false;
    }
  }

  checkIfRandomWordIsInAnswer = (word, answer) => {
    // const words = this.state.stagesLocal[this.state.stage];

    console.log(answer.sentenceSentToAPI, word, answer.sentenceSentToAPI.includes(word.word) ? true : false)
    
    return answer.sentenceSentToAPI.includes(word.word) ? true : false;
  }

  shuffle = originalCardArray => {
    let shuffledCardArray = [];
    Object.assign(shuffledCardArray, originalCardArray);
    for (let i = 0; i < shuffledCardArray.length; i++) {
      let temp = shuffledCardArray[i];
      let swapIndex = Math.floor(Math.random() * shuffledCardArray.length);
      shuffledCardArray[i] = shuffledCardArray[swapIndex];
      shuffledCardArray[swapIndex] = temp; 
    }
    return shuffledCardArray;
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
    // console.log('stages:', this.props.stages)
    // console.log('stage #', this.state.stage);

    return (
    <StyleDiv>
    <div className={!this.state.clickable ? "back-div" : "back-div-filter"}>
      <Topbar
        lives={this.props.lives - this.state.livesLost}
        points={this.state.points}
        round={this.state.round}
        stage={this.state.stage + 1}
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
        returnToMenu={this.props.returnToMenu}
        phonemesList={this.state.stage > -1 ? this.props.stages[this.state.stage].phonics : null}
        modal={this.state.modal}
        timer={this.props.timer}
      />
      {/* <Hero
        animation={this.state.animateHero}
        heroMovement={this.state.heroMovement}
        clickable={this.state.clickable}
      /> */}
      <Words
        key={this.state.transitionKey}
        words={this.state.words}
        clickWordHandler={this.clickWordHandler}
        clickable={this.state.clickable}
      />
      {/* {this.state.modal ? <GameModal modal={this.state.modal}/> : null} */}
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

export default GameUI;
