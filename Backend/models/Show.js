const mongoose = require("mongoose");

const showSchema = new mongoose.Schema(
    {
        movieId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Movie",
            required: true
        },

        theatreId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Theatre",
            required: true
        },

        showDate: {
            type: String,
            required: true
        },

        showTime: {
            type: String,
            required: true
        },

        price: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Show", showSchema);