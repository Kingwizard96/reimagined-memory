import React from 'react';
import { useMutation } from '@apollo/client';
import { SAVE_NASA_IMAGE } from '../utils/mutations'; // Define your GraphQL mutation

const SavedNasa = ({ image, isLoggedIn }) => {
  const [saveNasaImage] = useMutation(SAVE_NASA_IMAGE);

  const handleSave = () => {
    if (isLoggedIn) {
      saveNasaImage({
        variables: { nasaImage: image },
        // You may want to include an optimistic response here for a smoother user experience
      })
        .then((response) => {
          console.log('Image saved:', response.data.saveNasaImage);
        })
        .catch((error) => {
          console.error('Error saving image:', error.message);
        });
    } else {
      // Prompt the user to log in if not already logged in
      console.log('User not logged in. Prompt to log in.');
    }
  };

  return (
    <div>
      <h3>{image.title}</h3>
      <img src={image.url} alt={image.title} />
      <p>{image.explanation}</p>

      {isLoggedIn && (
        <button onClick={handleSave}>
          Save Image
        </button>
      )}
    </div>
  );
};

export default SavedNasa;