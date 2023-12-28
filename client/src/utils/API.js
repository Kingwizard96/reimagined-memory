// utils/API.js
import axios from 'axios';

export const getFormattedDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const fetchNasaData = async (startDate, endDate, apiKey) => {
  try {
    const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&start_date=${startDate}&end_date=${endDate}`;
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