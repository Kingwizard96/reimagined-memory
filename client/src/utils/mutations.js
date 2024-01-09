import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
        token
        user {
        _id
        username
        }
    }
`;

// Add the ADD_USER mutation
export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
        token
        user {
        _id
        username
            }
        }
    }
`;

//  Add save mutation
export const SAVE_NASA_IMAGE = gql`
    mutation saveNasaImage($title: String!, $url: String!, $date: String!) {
        saveNasaImage(title: $title, url: $url, date: $date) {
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

//  Add remove mutation
export const REMOVE_NASA_IMAGE = gql`
    mutation removeNasaImage($nasaImageId: ID!) {
        removeNasaImage(nasaImageId: $nasaImageId) {
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


