require('dotenv').config();

const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const { authMiddleware } = require('./utils/auth');
const path = require('path');
const db = require('./config/connection');

const { fetchNasaData } = require('./utils/nasaApi');

const app = express();
const PORT = process.env.PORT || 3001;

const { typeDefs, resolvers } = require('./schemas');
const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
});

const startApolloServer = async () => {
  await server.start();

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  // Endpoint for fetching NASA data
  app.get('/api/nasa-data', async (req, res) => {
    try {
      // date logic
      const today = new Date();
      const endDate = today.toISOString().split('T')[0];
      today.setDate(today.getDate() - 9);
      const startDate = today.toISOString().split('T')[0];

      const nasaData = await fetchNasaData(startDate, endDate);

      res.json(nasaData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.use('/graphql', expressMiddleware(server, { context: authMiddleware }));

  // Serve client/build as static assets in production
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  }

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};

startApolloServer();