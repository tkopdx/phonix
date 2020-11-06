const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const logger = require('morgan');

// Imports the Google Cloud client library
const textToSpeech = require('@google-cloud/text-to-speech');

// Import other required libraries
const fs = require('fs');
const util = require('util');
const { url } = require("inspector");
// Creates a client
const clientTTS = new textToSpeech.TextToSpeechClient();

// use morgan for logging requests
app.use(logger("dev"));
// Define middleware here
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

var whitelist = ['http://localhost:3001/', 'https://mighty-chamber-55300.herokuapp.com'];

var corsOptions = {
  origin: function(origin, callback){
    // allow requests with no origin 
    if(!origin) return callback(null, true);
    if(whitelist.indexOf(origin) === -1){
      var message = `The CORS policy for this origin doesn't allow access from the particular origin, ${origin}.`;
      return callback(new Error(message), false);
    }
    return callback(null, true);
  },
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions));

app.get("/assets/:id", (req, res) => {

  //TODO: fix heroku path

  const id = req.params.id;

  console.log(id);

  const file = fs.createReadStream(path.resolve(__dirname, `./public/assets/${id}.mp3`));

  // const file = fs.readFile(id);

  // res.send(file);

  file.on('open', function() {
    res.setHeader("content-type", "audio/mpeg");
    file.pipe(res);
  });

  file.on('close', function() {
    file.destroy();
  });

  file.on('error', function(err) {
    console.log('error', err);
  });

});

app.post("/texttospeech", async function(req, res) {

  // console.log('body: ', req.body);
  console.log('text: ', req.body.text);

  const id = req.body.id;

  // The text to synthesize
  const text = req.body.text;

  // Construct the request
  const request = {
    input: {text: text},
    // Select the language and SSML voice gender (optional)
    voice: {languageCode: 'en-US', name: 'en-US-Wavenet-F', ssmlGender: 'FEMALE'},
    // select the type of audio encoding
    audioConfig: {audioEncoding: 'MP3'},
  };

  // Performs the text-to-speech request
  try {
    const [response] = await clientTTS.synthesizeSpeech(request);

    // Write the binary audio content to a local file
    const writeFile = util.promisify(fs.writeFile);
    const filename = `${id}.mp3`
    const outputFile = __dirname + `/public/assets/` + filename;
    await writeFile(outputFile, response.audioContent, 'binary');
    console.log('file written to: ', outputFile);

    // fs.createReadStream(response.audioContent, options).pipe(res);

    // const uri = `data:${type};${encoding},${data}`;

    // console.log('hopefully this is an base64 audio file', uri);

    const URL = filename;

    res.send({
      result: 'success',
      // audioURL: URL
    });
  } catch (err) {
    res.send({error: `${err}`});
    console.log('error: ', err);
  }  
});

app.get('*', function(request, response) {
  // const address = request._remoteAddress;
  // const id = uuidv4();

  // const user = {
  //   address: address,
  //   id: id
  // }

  // console.log(user);

  // connections.push(user);

  response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Our server is now listening on port ${PORT}!`);
});

// test().catch(console.dir);