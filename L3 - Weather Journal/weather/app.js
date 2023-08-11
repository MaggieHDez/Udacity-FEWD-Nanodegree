const API_KEY = '0a14f53bb278bb798efca511e2fbb13d&units=imperial';

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

postData('/addMovie', {movie: 'The Matrix', score: 5});
postData('/addMovie', {movie: 'The Greatest Showman', score: 4.5});