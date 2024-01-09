const axios = require('axios');

module.exports.getFormattedDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

module.exports.fetchNasaData = async (startDate, endDate) => {
  try {
    const apiKey = 'DEMO_KEY'; // Replace with your NASA API key
    const formattedStartDate = this.getFormattedDate(new Date(startDate));
    const formattedEndDate = this.getFormattedDate(new Date(endDate));

    const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&start_date=${formattedStartDate}&end_date=${formattedEndDate}`;
    
    const response = await axios.get(apiUrl);

    return {
      data: response.data,
      headers: response.headers,
      status: response.status,
      statusText: response.statusText,
    };
  } catch (error) {
    throw new Error(`Error fetching data from NASA API: ${error.message}`);
  }
};