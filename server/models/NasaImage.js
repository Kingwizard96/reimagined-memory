const {Schema} = require('mongoose');

const nasaImageSchema = new Schema({
    date: {
        type: String,
        required: true,
    },
    explanation: {
        type: String,
        required: true,
    },
    hdurl: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    }
});

module.exports = nasaImageSchema;