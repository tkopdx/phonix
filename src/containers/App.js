import React, { Component } from 'react';
import Hero from '../components/Hero/Hero';
import Words from '../components/Words/Words';
import AudioClip from '../components/AudioClip/AudioClip';
import Topbar from '../components/Topbar/Topbar';
import './App.css';

// Imports the Google Cloud client library
const textToSpeech = require('@google-cloud/text-to-speech');

// Import other required libraries
const fs = require('fs');
const util = require('util');
// Creates a client. If no credentials passed, will look for credentials in environment.
//TODO: Using this tutorial, get creds to environment variables. https://github.com/googleapis/google-auth-library-nodejs#json-web-tokens
const client = new textToSpeech.TextToSpeechClient();


class App extends Component {

  state = {
    words: ['fish', 'dish'],
    answer: 'fish',
    points: 0,
    lives: 3,
    stage: 1,
    phonic: 'at',
    numOfWordsPerRound: 2,
    playing: true
  }

  componentDidMount() {
    if (this.state.answer) {
      console.log('mounted and called for speech');
      this.getTextToSpeech();
    }
  }

  componentDidUpdate() {
    if (this.state.answerAudio) {
      console.log('answerAudio is in state');
    } else {
      console.log('no answerAudio in state');
    }
  }

  async getTextToSpeech() {

    if (this.state.answerAudio) {
      return;
    }

    // The text to synthesize
    const text = this.state.answer;
  
    // Construct the request
    const request = {
      input: {text: text},
      // Select the language and SSML voice gender (optional)
      voice: {languageCode: '	en-US-Wavenet-C', ssmlGender: 'FEMALE'},
      // select the type of audio encoding
      audioConfig: {audioEncoding: 'MP3'},
    };
    console.log('making request');
    // Performs the text-to-speech request
    const [response] = await client.synthesizeSpeech(request);
    console.log('successful response');
    // Write the binary audio content to a local file
    const writeFile = util.promisify(fs.writeFile);
    
    const answerAudio = await writeFile('output.mp3', response.audioContent, 'binary');

    console.log('file written');

    this.setState({answerAudio: answerAudio});
  }

  clickWordHandler = (word, index) => {
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
      let prevPoints, newPoints;
      prevPoints = this.state.points;
      newPoints = prevPoints + 1;
      setTimeout(() => this.setState({points: newPoints}), 1500);
    //call for next words
      setTimeout(() => this.displayNewWords(), 1500);
  }

  incorrectAnswerHandler = index => {

    //play bad animation
      this.setState({
        animateHero: 'inc',
        heroMovement: index
      });
    //resolve lives
      let prevLives, newLives;
      prevLives = this.state.lives;
      newLives = prevLives - 1;

      if (newLives <= 0) {
        setTimeout(() => this.setState({lives: newLives}), 1500);
        setTimeout(() => this.gameOver(), 1500);
      } else {
        setTimeout(() => this.setState({lives: newLives}), 1500);
        //call for next words 
        setTimeout(() => this.displayNewWords(), 1500);
      }
  }

  gameOver = () => {
    this.setState({playing: false});
  }

  displayNewWords = () => {
    let words, curWordsArray, nums, num, newWords, randAnsIndex, answer;

    nums = [];
    newWords = [];
    
    setTimeout(() => this.setState({
      animateHero: null,
      heroMovement:null,
      answerAudio: null
    }), 1500);

    words = {
      'at': ['cat', 'bat', 'mat', 'rat', 'hat', 'Pat'],
      'am': ['Pam', 'ram', 'ham', 'spam', 'clam'] 
    }

    curWordsArray = [...words[this.state.phonic]];

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

    setTimeout(() => this.setState({
      words: newWords,
      answer: answer
    }), 2000);

  }

  render = () => {
    return (
    <div className="App">
      <Topbar
        lives={this.state.lives}
        points={this.state.points}
        stage={this.state.stage}
        playing={this.state.playing}
      />
      <Hero
        animation={this.state.animateHero}
        heroMovement={this.state.heroMovement}
      />
      <Words
        words={this.state.words}
        clickWordHandler={this.clickWordHandler}
      />
      <AudioClip
        audio={this.state.answerAudio}
      />
      {!this.state.playing ? <div>Game over!</div> : null}
    </div>
    )
  }

}

export default App;
