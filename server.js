// bring in required packages
const express = require("express");

// create a express server object
const app = express();

// read the PORT number from enviroment variable
const PORT = process.env.PORT || 3001;

// serving the static pages
app.use(express.static("public"));

// server start listening to the requests
app.listen(PORT, () => 
    console.log(`Note Taking Server listening at ${PORT}`)
)