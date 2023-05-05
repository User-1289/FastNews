const axios = require('axios');

exports.handler = async function(event, context) {
  try {
    const response = await axios.get(`https://newsapi.org/v2/everything?q=politics&from=2023-05-03&sortBy=popularity&apiKey=eab1631abf374798bc855fffdc90194f`);
    const data = response.data;
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error.message }),
    };
  }
};
