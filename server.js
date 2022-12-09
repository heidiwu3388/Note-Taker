// bring in required packages
const express = require("express");
const path = require("path");

// create a express server object
const app = express();

// read the PORT number from enviroment variable
const PORT = process.env.PORT || 3001;

// serving the static pages
app.use(express.static("public"));

// GET Route for notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// server start listening to the requests
app.listen(PORT, () => 
    console.log(`Note Taking Server listening at ${PORT}`)
)