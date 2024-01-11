const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = "spooky";
const expiration = '2h';

module.exports = {
    AuthenticationError: new GraphQLError('Could not authenticate user.', {
        extensions: {
          code: 'UNAUTHENTICATED',
        },
      }),
    
    
      authMiddleware: function ({req}) {
        let token = req.body.token || req.query.token || req.headers.authorization;
    
        if (req.headers.authorization) {
          token = token.split(' ').pop().trim();
        }
    
        if (!token) {
          return req;
        }
    
        // verify token and get user data out of it
        try {
          const { data } = jwt.verify(token, secret, { maxAge: expiration });
          req.user = data;
        } catch {
          console.log('Invalid token');
         
        }
    
        // send to next endpoint
        return req;
      },
      signToken: function ({ username, email, _id }) {
        const payload = { username, email, _id };
        console.log('hello user after creation token payload ', payload, secret)
        return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
      },
    };