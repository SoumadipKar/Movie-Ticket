const express = require("express");

const router = express.Router();

const {
    getMovies,
    getHindiMovies,
    getMovieById,
    createMovie,
    deleteMovie
} = require("../models/controllers/movieController");

router.get("/hindi", getHindiMovies);

router.get("/", getMovies);

router.get("/:id", getMovieById);

router.post("/", createMovie);

router.delete("/:id", deleteMovie);

module.exports = router;