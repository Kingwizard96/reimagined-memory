import React from 'react';

const About = () => {
  return (
    <div>
      <h2>About Our Project</h2>
      <p>
        Welcome to our NASA Image Explorer! This project allows you to search and explore
        fascinating images provided by NASA's Astronomy Picture of the Day (APOD) API.
        Users can search for images within a specific date range, view details about each
        image, and save their favorite images if they are logged in.
      </p>
      <p>
        Our goal is to provide users with an immersive experience, showcasing the beauty
        and wonder of space captured by NASA's powerful telescopes and instruments.
        Feel free to explore, save your favorite images, and enjoy the wonders of the cosmos!
      </p>
      <p>
        This project is powered by GraphQL on the server side, Apollo Client on the client side,
        and leverages the NASA APOD API for fetching stunning images. Thank you for joining us on
        this cosmic journey!
      </p>
    </div>
  );
};

export default About;