import { useState, useEffect } from 'react';

const NasaInfo = () => {
 const [nasaData, setNasaData] = useState(null);

 useEffect(() => {
   const fetchNasaData = async () => {
     try {
       // Use the demo key for testing
        // const apiKey = 'DEMO_KEY';
       const apiKey = 'zdqL6916XxJTGynjBI3M4c5v9f6s5wskqHIklS1w';
       const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;

       const response = await fetch(apiUrl);
       const data = await response.json();

       setNasaData(data);
     } catch (error) {
       console.error('Error fetching data from NASA API:', error);
     }
   };

   fetchNasaData();
 }, []);

 return (
   <div>
     {nasaData && (
       <div>
         <h2>{nasaData.title}</h2>
         <img src={nasaData.url} alt={nasaData.title} style={{ maxWidth: '100%' }} />
         <p>{nasaData.explanation}</p>
       </div>
     )}
   </div>
 );
};

export default NasaInfo;
