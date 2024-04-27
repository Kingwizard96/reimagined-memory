const typeDefs = `
  type Query {
    me: User
    users: [User]
    user(username: String!): User
    getNasaData(startDate: String, endDate: String): NasaData
    nasaImages: [NasaImage]
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveNasaImage(title: String!, url: String!, date: String!): NasaImage
    removeNasaImage(nasaImageId: ID!): User
    # Add other mutations as needed
  }

  type User {
    id: ID!
    username: String!
    email: String!
    savedNasaImages: [NasaImage]
    imageCount: Int
  }

  type Auth {
    token: ID!
    user: User
  }

  type NasaData {
    data: [NasaImage]  
    headers: String
    status: Int
    statusText: String
  }

  type NasaImage {
    title: String!
    url: String!
    date: String!
    explanation:String
  }
`;

module.exports = typeDefs;