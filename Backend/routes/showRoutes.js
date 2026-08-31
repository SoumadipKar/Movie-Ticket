const express = require("express");

const router = express.Router();

const Show = require("../models/Show");

router.get("/", async (req, res) => {
    try {

        const shows = await Show.find()
            .populate("movieId")
            .populate("theatreId");

        res.json(shows);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
});


router.get("/movie/:movieId", async (req, res) => {
    try {

        const shows = await Show.find({
            movieId: req.params.movieId
        })
            .populate("movieId")
            .populate("theatreId");

        res.json(shows);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
});


router.post("/", async (req, res) => {

    try {

        const show = await Show.create(req.body);

        res.status(201).json(show);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


module.exports = router;