import React, { useState, useEffect } from 'react';

const NasaInfo = () => {
  const [nasaDataList, setNasaDataList] = useState([]);
  const [isFetchingWeek, setIsFetchingWeek] = useState(false);
  const [rateLimit, setRateLimit] = useState(null);

  useEffect(() => {
    const fetchNasaData = async (startDate, endDate) => {
      try {
        const apiKey = 'DEMO_KEY';
        const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&start_date=${startDate}&end_date=${endDate}`;

        const response = await fetch(apiUrl);

        // Check for X-RateLimit-Limit and X-RateLimit-Remaining headers
        const rateLimitHeader = response.headers.get('X-RateLimit-Limit');
        const rateRemainingHeader = response.headers.get('X-RateLimit-Remaining');

        // Update rate limit state
        setRateLimit(rateLimitHeader);

        if (rateRemainingHeader !== null) {
          console.log(`Remaining requests within the current hour: ${rateRemainingHeader}`);
        }

        if (response.ok) {
          const data = await response.json();
          setNasaDataList(data.reverse()); // Reverse the order to display the latest first
        } else {
          console.error('API request failed:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Error fetching data from NASA API:', error);
      }
    };

    // Calculate start and end dates based on user selection
    const today = getFormattedDate(new Date());
    const weekAgo = getFormattedDate(new Date(new Date().setDate(new Date().getDate() - 6)));

    const startDate = isFetchingWeek ? weekAgo : today;
    const endDate = today;

    // Fetch data based on user selection
    fetchNasaData(startDate, endDate);
  }, [isFetchingWeek]);

  // Function to format date as YYYY-MM-DD
  const getFormattedDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const toggleFetchWeek = () => {
    setIsFetchingWeek((prevIsFetchingWeek) => !prevIsFetchingWeek);
  };

  return (
    <div>
      <button onClick={toggleFetchWeek}>
        {isFetchingWeek ? 'Show Today' : 'Show Last 7 Days'}
      </button>

      {nasaDataList.map((nasaData, index) => (
        <div key={index}>
          <h2>{nasaData.title}</h2>
          <img src={nasaData.url} alt={nasaData.title} style={{ maxWidth: '100%' }} />
          <p>{nasaData.explanation}</p>
        </div>
      ))}

      {rateLimit && <p>Hourly rate limit: {rateLimit}</p>}
    </div>
  );
};

export default NasaInfo;