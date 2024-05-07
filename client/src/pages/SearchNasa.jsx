import React, { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_NASA_IMAGES } from '../utils/queries';
import { useMutation } from '@apollo/client';
import { SAVE_NASA_IMAGE } from '../utils/mutations';
import './SearchNasa.css';
import Auth from '../utils/auth';

const SearchNasa = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [executeSearch, { loading, error, data }] = useLazyQuery(GET_NASA_IMAGES);
  const [isLoggedIn, setIsLoggedIn] = useState(Auth.loggedIn());

  useEffect(() => {
    setIsLoggedIn(Auth.loggedIn());
  }, []);

  const [saveNasaImage] = useMutation(SAVE_NASA_IMAGE);

  const handleSaveImage = async (media) => {
    try {
      await saveNasaImage({ variables: { nasaImage: media } });
      console.log('Image saved successfully!');
    } catch (error) {
      console.error('Error saving image:', error.message);
    }
  };

  const handleInputChange = (e, setter) => {
    setter(e.target.value);
  };

  const today = new Date().toISOString().split('T')[0];

  const handleSubmit = (e) => {
    e.preventDefault();
    executeSearch({ variables: { startDate, endDate } });
  };

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
            <div key={index} className="card">
              <img src={media.url} alt={media.title} />
              <h3>{media.title}</h3>
              <p>{media.date}</p>
              <p>{media.explanation}</p>
              {isLoggedIn && <button onClick={() => handleSaveImage(media)}>Save Image</button>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchNasa;