const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },

        genre: String,

        language: String,

        duration: String,

        rating: {
            type: Number,
            default: 0
        },

        description: String,

        poster: String
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Movie", movieSchema);