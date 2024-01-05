
const typeDefs = `
  
  type Query {
    me: User
    users: [User]
    user(username: String!): User
    getNasaData(startDate: String, endDate: String): NasaData
    getNasaImages: [NasaImage]
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveNasaImage(title: String!, url: String!, date: String!): NasaImage
    removeNasaImage(nasaImageId: ID!): User
    # Add other mutations as needed
  }

  type NasaData {
    data: String
    headers: String
    status: Int
    statusText: String
  }

  type NasaImage {
    id: ID!
    title: String!
    url: String!
    date: String!
  }

  type Auth {
    token: ID!
    user: User
  }

  type User {
    id: ID!
    username: String!
    email: String!
    savedNasaImages: [NasaImage]
    imageCount: Int
  }
`;

module.exports = typeDefs;