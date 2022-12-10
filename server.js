// bring in required packages/helpers/routers
const express = require("express");
const path = require("path");
const notesRouter = require("./routes/notesRouter");

// create a express server object
const app = express();

// read the PORT number from enviroment variable
const PORT = process.env.PORT || 3001;

// redirect all "/api/notes" routes to notesRouter
app.use("/api/notes", notesRouter) ;

// initiate middleware to serve the static pages
app.use(express.static("public"));

// HTML route : "GET /notes" 
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);
 
// HTML route: "GET *" for everything else
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// server start listening to the requests
app.listen(PORT, () => 
    console.log(`Note Taking Server listening at ${PORT}`)
)