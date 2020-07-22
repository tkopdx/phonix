const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const logger = require('morgan');
require('dotenv').config()

// use morgan for logging requests
app.use(logger("dev"));
// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets
app.use(express.static("./client/build"));

// Send every other request to the React app
// Define any API routes before this runs
app.get("/mreh", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});
app.get("/other", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/other.html"));
});
app.post("/texttospeech", async function(req, res) {
    const myImpenetrableFortressOfDoom = req.body.text;
    const response = await reqHero("www.google.com" + process.env.API_KEY, myImpenetrableFortressOfDoom)
    res.send(response)
})

app.listen(PORT, () => {
  console.log(`Our server is now listening on port ${PORT}!`);
});