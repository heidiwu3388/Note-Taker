// bring in required packages
const express = require("express");
const fs = require("fs");
const { readFromFile, readAndAppend, writeToFile } = require("../helpers/fsutils");
const { v4: uuidv4 } = require('uuid');

// initiate notes router
const notes = express.Router();

// API Route : "GET /api/notes" for retrieving all the notes
notes.get("/", (req, res) => {
    console.log("")
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

// API Route : "POST /api/notes" for creating new note
notes.post("/", (req, res) => {
  console.log("POST req.body: ", req.body);
  
  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      id: uuidv4(),
      title,
      text,
    };
    readAndAppend(newNote, "./db/db.json");   
    res.status(200).json(newNote);
  } else {
    res.error("Error in adding note");
  }
});

// API Route : "DELETE /api/notes/:id" for deleting a note
notes.delete("/:id", (req, res) => {
  // get id parameter from the request
  const idToBeDeleted = req.params.id;
  // check if no id passed in
  if (!idToBeDeleted) {
    console.error("id is missing from the request!");
    res.status(400).send("id is missing from the request!");
  } else {
    fs.readFile("./db/db.json", "utf8", (err, data) => {
      if (err) {
        console.error(`reading JSON file error: ${err}`);
        res.status(500).snd(`reading JSON file error: ${err}`);
      } else {
        // parse the JSON data from the file
        const notes = JSON.parse(data);
        // find the index of the note to be deleted
        const index = notes.findIndex(note => note.id === idToBeDeleted);
        console.log("index: ", index);
        // if index is found
        if (index !== -1) {
          notes.splice(index, 1);
          writeToFile("./db/db.json", notes);
          console.log("note deleted sucessfully!");
          res.status(200).send("note deleted sucessfully!");
        }    
        else {
          console.log("id not found");
          res.status(404).send("id not found!");
        }
      }
    });
  }
});



module.exports = notes;
