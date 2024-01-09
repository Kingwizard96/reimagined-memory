// queries.js
import { gql } from '@apollo/client';

export const GET_NASA_IMAGES = gql`
  query GetNasaImages($startDate: String!, $endDate: String!) {
    nasaImages: getNasaData(startDate: $startDate, endDate: $endDate) {
      data {
        title
        url
        explanation
        date
      }
    }
  }
`;

export const GET_ME = gql`
  query Me {
    me {
      _id
      username
      email
      savedNasaImages {
        imageId
        title
        url
        date
        explanation
      }
    }
  }
`;