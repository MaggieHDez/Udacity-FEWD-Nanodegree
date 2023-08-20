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

	getData(baseUrl, zip, API_KEY)
		.then(function (data) {
      // Add data
      if (data!== null) {
        postData("/generateWeatherData", {
          temperature: data.main.temp,
          date: formatDate(data.dt * 1000),
          userResponse: feelings,
        });
      }
		})
  console.log("Success!");
}

/* Function to GET Web API Data*/
const getData = async (baseUrl, zipCode, API_KEY) => {

  let url = `${baseUrl}/?zip=${zipCode}&appid=${API_KEY}`;

  const request = await fetch(url);
  try {
    // Transform into JSON
    const allData = await request.json();
    if( allData.cod !== 200){
      alert(`Error retrieving data: ${allData.message}`);
      return null;
    } else {
      console.log('data', allData);
      return allData;
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

function formatDate(date) {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2)
      month = '0' + month;
  if (day.length < 2)
      day = '0' + day;

  return [ month, day, year].join('/');
}