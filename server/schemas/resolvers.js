const { User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
const { fetchNasaData } = require('../controllers/nasaApi');


const resolvers = {
  Query: {
    getNasaData: async (parent, { startDate, endDate }) => {
      const nasaData = await fetchNasaData(startDate, endDate);
      return {
        data: nasaData.data, // Return an object with 'data' field
        headers: nasaData.headers,
        status: nasaData.status,
        statusText: nasaData.statusText,
      };
    },
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findById(context.user._id).select("-__v -password").populate("savedNasaImages");
        return userData;
      }
      throw new AuthenticationError("Not logged in");
    },
    users: async () => {
      return User.find().select("-__v -password").populate("savedNasaImages");
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).select("-__v -password").populate("savedNasaImages");
    },
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);
      return { token, user };
    },

    saveNasaImage: async (parent, {nasaImage}, context) => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          context.user._id,
          { $addToSet: { savedNasaImages: nasaImage } },
          { new: true }
        );
        return updatedUser.savedNasaImages.slice(-1)[0]; // Returning only the saved NASA image
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    removeNasaImage: async (parent, { nasaImage }, context) => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $pull: { savedNasaImages: { nasaImage } } },
          { new: true }
        );
        return updatedUser;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;






