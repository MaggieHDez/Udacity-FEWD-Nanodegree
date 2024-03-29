// Setup empty JS object to act as endpoint for all routes
 const projectData = [];

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8080;
const server = app.listen(port, ()=>{console.log(`running on localhost: ${port}`)})

// Routes

// GET
app.get('/all', getData);

function getData (req, res) {
  res.send(projectData);
}

// POST
app.post("/generateWeatherData", weatherData);

function weatherData(req, res) {
  let data = req.body;
  newEntry = {
    date: data.date,
    temperature: data.temperature,
    feelings: data.userResponse
  }
  projectData.push(newEntry);
  console.log(projectData);
  res.send(projectData)
}