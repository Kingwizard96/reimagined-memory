import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import { REMOVE_NASA_IMAGE, SAVE_NASA_IMAGE } from '../utils/mutations'; // Import the saveNasaImage mutation
import { removeNasaImageId } from '../utils/localStorage';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import Auth from '../utils/auth';

const SavedNasa = ({ media, isLoggedIn }) => {
  const { loading, data } = useQuery(GET_ME);
  const [removeNasaImage] = useMutation(REMOVE_NASA_IMAGE);
  const [saveNasaImage] = useMutation(SAVE_NASA_IMAGE); // Initialize the saveNasaImage mutation
  const [error, setError] = useState(null);

  const userData = data?.me || {};

  const handleSaveImage = async () => {
    if (!isLoggedIn) {
      setError('Please log in to save the image.');
      return;
    }

    try {
      const { data } = await saveNasaImage({
        variables: { nasaImage: media },
      });
      console.log('Image saved:', data.saveNasaImage);
      setError(null);
    } catch (err) {
      console.error('Error saving image:', err.message);
      setError('Failed to save image. Please try again.');
    }
  };

  const handleRemoveImage = async (nasaImageId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }

    try {
      const { data } = await removeNasaImage({
        variables: { nasaImageId },
      });
      removeNasaImageId(nasaImageId);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <div fluid className="text-light bg-dark p-5">
        <Container>
          <h1>Viewing {userData.username}'s NASA Images!</h1>
        </Container>
      </div>
      <Container>
        <h2 className='pt-5'>
          {userData.savedNasaImages?.length
            ? `Viewing ${userData.savedNasaImages.length} saved ${userData.savedNasaImages.length === 1 ? 'image' : 'images'}:`
            : 'You have no saved NASA images!'}
        </h2>
        <div>
          <Row>
            {userData.savedNasaImages?.map((image) => {
              return (
                <Col md="4" key={image._id}>
                  <Card border="dark">
                    <Card.Img src={image.url} alt={`NASA Image: ${image.title}`} variant="top" />
                    <Card.Body>
                      <Card.Title>{image.title}</Card.Title>
                      <Card.Text>{image.explanation}</Card.Text>
                      <Button className="btn-block btn-danger" onClick={() => handleRemoveImage(image._id)}>
                        Remove Image
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </div>
      </Container>
    </>
  );
};

export default SavedNasa;