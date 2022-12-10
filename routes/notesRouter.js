// bring in required packages
const express = require("express");
const { readFromFile, readAndAppend } = require("../helpers/fsutils");
const { v4: uuidv4 } = require('uuid');

// initiate notes router
const notes = express.Router();

// API Route : "GET /api/notes" for retrieving all the notes
notes.get("/", (req, res) => {
    console.log("")
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

// API Route : "POST /api/notes" for creating new notes
notes.post("/", (req, res) => {
  console.log("POST req.body: ", req.body);
  
  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      note_id: uuidv4(),
      title,
      text,
    };
    readAndAppend(newNote, "./db/db.json");   
    res.status(200).json(newNote);
  } else {
    res.error("Error in adding note");
  }
});



module.exports = notes;
