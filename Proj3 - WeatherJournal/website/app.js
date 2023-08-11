/* Global Variables */
const API_KEY = '0a14f53bb278bb798efca511e2fbb13d&units=imperial'; // Personal API Key for OpenWeatherMap API
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Event listener to add function to existing HTML DOM element
const submitBtn = document.getElementById("generate");
submitBtn.addEventListener('click', generateAction);

/* Function called by event listener */
function generateAction(evt) {
    evt.preventDefault;
    console.log("Success!", evt);
}

/* Function to POST data */
const postData = async ( url = '', data = {})=>{
    console.log(data);
      const response = await fetch(url, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },
     // Body data type must match "Content-Type" header
      body: JSON.stringify(data),
    });

      try {
        const newData = await response.json();
        console.log(newData);
        return newData;
      }catch(error) {
      console.log("error", error);
      }
  }