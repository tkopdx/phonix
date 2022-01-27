# Hello!

## Thanks for checking out Phonix!

### What is this?
Phonix is a fun English phonics game where players listen to audio clips and click the corresponding word to earn points and progress through the game. In its current form, a player wins by clearing 5 stages without losing three lives or running out of time in each stage. Audio clips can either be full sentences that include a keyword or just the keyword. Phonix uses the 44 American English phonemes.

Phonix is constructed using React, Express, Google Cloud's Text-to-Speech API, and Heroku.

### How do I use this?
Head on over to https://mighty-chamber-55300.herokuapp.com/ to check out the current version of Phonix.

On the main menu, you can drag and drop items to add to the possible phonemes for each stage. One phoneme will be randomly chosen. Click items in the list to delete them. Stages set to 'sentence' play a sentence while other stages only play singular words.

During the game, words or sentences will be chosen randomly and autoplayed one time. Players can hear the audio clips again by clipping the sound icon in the topbar. The timer will stop while audio is loading or playing, so players aren't penalized for listening again. You can return to the main menu at anytime by clicking the menu button in the top left of the screen.


### Future plans
My next steps are to allow users to create temporary custom phonemes or examples for their own use. This includes allowing users to change the Text-to-Speech language. I've also been asked to make an online, team battle version. I hope to have a host view that can monitor all of the players, display their timers, and results. I'll keep expanding the phoneme example words and sentences lists.

### I want to make my own version of Phonix. What do I do?
Once you've cloned this repo, you can run your own version in development mode. Make sure to setup your Google Cloud credentials as environment variables, change the server whitelist to your own domain(s), and then run npm start in both the server and react-ui directories. If you want to run this on your own computer and not worry about setting up a domain or anything like that, then don't worry about the next paragraph.

This project follows mars's example for creating a React app with a Node.js server on Heroku, so pushing your master to Heroku with the current file structure should be fine. Check out that guide here: https://github.com/mars/heroku-cra-node. 
For your credentials, take a look at this build pack: https://github.com/gerywahyunugraha/heroku-google-application-credentials-buildpack.

### License

ISC. Please don't charge other folks to use a clone of this repo. Your karma will take a beating.

