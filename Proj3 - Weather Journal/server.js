// Empty JS object. Acts as endpoint for all routes
projectData = {};

const bodyParser = require('body-parser')
const express = require('express');
const cors = require('cors');

// Start up an instance of app
const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(cors());

// Initialize main project folder

app.use(express.static('weather'));

const port = 8080;
// Spin up server
const server = app.listen(port, listening);
//const server = app.listen(port, ()=>{console.log(`ruuning on localhost: ${port}`)})

//Callback to debug
function listening(){
    console.log('server running');
    console.log(`running on localhost: ${port}`);
}
