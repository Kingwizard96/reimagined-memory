// NasaInfo component
import React, { useState, useEffect } from 'react';
import { fetchNasaData, getFormattedDate } from '../utils/API';

export default function NasaInfo() {
  const [nasaDataList, setNasaDataList] = useState([]);
  const [isFetchingWeek, setIsFetchingWeek] = useState(false);
  const [rateLimit, setRateLimit] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiKey = 'DEMO_KEY'; // Replace with your actual API key
        const today = getFormattedDate(new Date());
        const weekAgo = getFormattedDate(new Date(new Date().setDate(new Date().getDate() - 6)));
        const startDate = isFetchingWeek ? weekAgo : today;

        const { data, headers, status, statusText } = await fetchNasaData(startDate, today, apiKey);

        // Check for X-RateLimit-Limit and X-RateLimit-Remaining headers
        const rateRemainingHeader = headers['x-ratelimit-remaining'];
        
        if (rateRemainingHeader !== undefined) {
          console.log(`Remaining requests within the current hour: ${rateRemainingHeader}`);
        }
        // Update rate limit state
        setRateLimit(rateRemainingHeader);

        if (status === 200) {
          setNasaDataList(data.reverse());
        } else {
          console.error('API request failed:', status, statusText);
        }
      } catch (err) {
        console.error(`Error fetching data from NASA API: ${err.message}`);
      }
    };

    fetchData();
  }, [isFetchingWeek]);

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

    </div>
  );
}