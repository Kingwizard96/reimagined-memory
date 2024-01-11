import React from 'react';
import { Container } from 'react-bootstrap';
import backgroundImage from '/assets/background.png'; // Replace with the path to your background image

const Background = () => {
  return (
    <Container
      fluid
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
        // Add other default styles
      }}
    >
      {/* Your component content goes here */}
    </Container>
  );
};

export default Background;