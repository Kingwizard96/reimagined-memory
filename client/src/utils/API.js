export const getMe = (token) => {
    return fetch('/api/users/me', {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    });
  };
  
  export const createUser = (userData) => {
    return fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
  };
  
  export const loginUser = (userData) => {
    return fetch('/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
  };

//  save nasa data for a logged in user
export const saveNasaImage = (nasaImageData, token) => {
    return fetch('/api/users', {
        method: 'PUT',
        headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
        },
        // make sure to serialize the JSON body
        body: JSON.stringify(nasaImageData),
    });
    }

//  remove saved nasa data for a logged in user
export const removeNasaImage = (nasaImageId, token) => {
    return fetch(`/api/users/nasaImages/${nasaImageId}`, {
        method: 'DELETE',
        headers: {
        authorization: `Bearer ${token}`,
        },
    });
    };

//  get nasa data for a logged in user
export const getNasaData = (apiKey, startDate, endDate) => {
    return fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&start_date=${startDate}&end_date=${endDate}`)
};