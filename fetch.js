
const axios = require("axios");

async function fetchData() {
  const options = {
    method: "GET",
    url: "https://realtor.p.rapidapi.com/schools/list",
    params: {
      state_code: "01", // Replace with the actual state code
    },
    headers: {
      "X-RapidAPI-Key": "c4da87788cmsh56ed38777c9d63ap16e4dajsn4b66eb13ef5f",
      "X-RapidAPI-Host": "realtor.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

// Call the asynchronous function
fetchData();
