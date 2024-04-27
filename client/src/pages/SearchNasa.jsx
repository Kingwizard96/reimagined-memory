import React, { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_NASA_IMAGES } from '../utils/queries';
import './SearchNasa.css';

const SearchNasa = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [executeSearch, { loading, error, data }] = useLazyQuery(GET_NASA_IMAGES);

  // Handle input changes
  const handleInputChange = (e, setter) => {
    setter(e.target.value);
  };

  // Calculate today's date in the format "YYYY-MM-DD"
  const today = new Date().toISOString().split('T')[0];

  // Handle the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    executeSearch({ variables: { startDate, endDate } });
  };

  useEffect(() => {
    console.log('Data:', data);
  }, [data]);

  return (
    <div className='bg-dark text-light'>
      <h2>Search NASA Images</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Start Date:
          <input
            type="date"
            value={startDate}
            onChange={(e) => handleInputChange(e, setStartDate)}
            min="1996-01-01"
            max={today}
          />
        </label>
        <br />
        <label>
          End Date:
          <input
            type="date"
            value={endDate}
            onChange={(e) => handleInputChange(e, setEndDate)}
            min="1996-01-01"
            max={today}
          />
        </label>
        <br />
        <button type="submit">Search</button>
      </form>
      <br />

      {loading && <p>Loading...</p>}
      {error && <p>Error fetching data: {error.message}</p>}

      {data && data.nasaImages && (
        <div className='card-container'>
          {data.nasaImages.data.map((media, index) => (
            <div className='card' key={index}>
              <img src={media.url} alt={media.title} />
              <h3>{media.title}</h3>
              <p>{media.date}</p>
              <p>{media.explanation}</p>
            </div>
          ))}
        </div>
      )}
    </div>
    
  );
};

export default SearchNasa;
