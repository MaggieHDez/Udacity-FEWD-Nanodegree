/* Global Variables */
const API_KEY = '0a14f53bb278bb798efca511e2fbb13d&units=imperial'; // Personal API Key for OpenWeatherMap API
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';


// Event listener to add function to existing HTML DOM element
const submitBtn = document.getElementById("generate");
submitBtn.addEventListener('click', performAction);

/* Function called by event listener */
function performAction(evt) {
  evt.preventDefault;
  let zip = document.getElementById("zip").value;
	let feelings = document.getElementById("feelings").value;
  let valid = validateZip(zip);
  if (valid){
  // Calling Weather API
    getData(baseUrl, zip, API_KEY)
      .then(function (data) {
        // Check if data was found
        if (data !== null) {
          // Add data to POST request
          postData("/generateWeatherData", {
            date: formatDate(data.dt),
            temperature: data.main.temp,
            userResponse: feelings,
          }).then(updateUI());
        }
      });
    console.log("Success!");
  }
}

/* Function to GET Web API Data*/
const getData = async (baseUrl, zipCode, API_KEY) => {

  let url = `${baseUrl}/?zip=${zipCode}&appid=${API_KEY}`;
  // Fetch
  const res = await fetch(url);
  try {
    // Transform into JSON
    const data = await res.json();
    if( data.cod !== 200){
      alert(`Error retrieving data: ${data.message}`);
      return null;
    } else {
      console.log('data', data);
      return data;
    }
  } catch (error) {
    console.log("error", error);
  }
};

/* Function to POST data */
const postData = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });

  try {
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.log("error", error);
    // appropriately handle the error
  }
};

const updateUI = async () => {
  const request = await fetch('/all');
  try{
    const allData = await request.json();
    allData.reverse();
    document.getElementById('date').innerHTML = `Date: ${allData[0].date}`;
    document.getElementById('temp').innerHTML = `Temp: ${allData[0].temperature} degrees Fahrenheit`;
    document.getElementById('content').innerHTML = `Feelings: ${allData[0].feelings}`;

  }catch(error){
    console.log("error", error);
  }
}

function validateZip(zip){
  if (zip.toString().length === 5){
    document.getElementById("errorMsg").classList.add('valid');
    return true;
  } else{
    document.getElementById("errorMsg").classList.remove('valid');
    return false;
  }
}

function formatDate(date) {
  var d = new Date(date * 1000),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2)
      month = '0' + month;
  if (day.length < 2)
      day = '0' + day;

  return [ month, day, year].join('/');
}