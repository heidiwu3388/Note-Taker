// bring in required packages
const express = require("express");
const { readFromFile } = require("../helpers/fsutils");

// initiate notes router
const notes = express.Router();

// API Route : "GET /api/notes" for retrieving all the notes
notes.get("/", (req, res) => {
    console.log("")
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});



module.exports = notes;
