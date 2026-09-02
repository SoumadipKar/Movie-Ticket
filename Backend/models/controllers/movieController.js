const mongoose = require("mongoose");
const Movie = require("../../models/Movie");

const fallbackHindiMovies = [
    {
        _id: "fallback-hindi-1",
        title: "3 Idiots",
        genre: "Comedy / Drama",
        language: "Hindi",
        duration: "170 min",
        rating: 8.4,
        description: "Two friends revisit their college days and realize how far they have come in life.",
        poster: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80"
    },
    {
        _id: "fallback-hindi-2",
        title: "Dangal",
        genre: "Sports / Drama",
        language: "Hindi",
        duration: "161 min",
        rating: 8.4,
        description: "A father trains his daughters to become champions in the face of social challenges.",
        poster: "https://images.unsplash.com/photo-1513106580091-1d82408b8cd6?auto=format&fit=crop&w=800&q=80"
    },
    {
        _id: "fallback-hindi-3",
        title: "Pathaan",
        genre: "Action / Thriller",
        language: "Hindi",
        duration: "146 min",
        rating: 7.5,
        description: "A spy returns for a secret mission that puts the entire world at risk.",
        poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=800&q=80"
    }
];

const getMovieLanguageFilter = (language) => {
    if (!language) {
        return { language: /^Hindi$/i };
    }

    return {
        language: new RegExp(`^${language}$`, "i")
    };
};

const useFallback = () => mongoose.connection.readyState !== 1;

exports.getMovies = async (req, res) => {
    try {
        if (useFallback()) {
            return res.json(fallbackHindiMovies);
        }

        const requestedLanguage = req.query.language || "Hindi";

        const movies = await Movie.find(
            getMovieLanguageFilter(requestedLanguage)
        ).sort({
            createdAt: -1
        });

        if (movies.length === 0) {
            return res.json(fallbackHindiMovies);
        }

        return res.json(movies);

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

exports.getHindiMovies = async (req, res) => {
    try {
        if (useFallback()) {
            return res.json(fallbackHindiMovies);
        }

        const movies = await Movie.find({
            language: /^Hindi$/i
        }).sort({
            createdAt: -1
        });

        if (movies.length === 0) {
            return res.json(fallbackHindiMovies);
        }

        return res.json(movies);
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};


exports.getMovieById = async (req, res) => {
    try {
        if (useFallback()) {
            const movie = fallbackHindiMovies.find(item => item._id === req.params.id);

            if (!movie) {
                return res.status(404).json({
                    message: "Movie not found"
                });
            }

            return res.json(movie);
        }

        const movie = await Movie.findById(req.params.id);

        if (!movie) {
            return res.status(404).json({
                message: "Movie not found"
            });
        }

        return res.json(movie);

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};


exports.createMovie = async (req, res) => {
    try {
        if (useFallback()) {
            const movie = {
                ...req.body,
                _id: `fallback-${Date.now()}`,
                language: "Hindi"
            };
            fallbackHindiMovies.unshift(movie);
            return res.status(201).json(movie);
        }

        const movie = await Movie.create(req.body);

        return res.status(201).json(movie);

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};


exports.deleteMovie = async (req, res) => {
    try {
        if (useFallback()) {
            const index = fallbackHindiMovies.findIndex(item => item._id === req.params.id);
            if (index !== -1) {
                fallbackHindiMovies.splice(index, 1);
            }
            return res.json({
                message: "Movie deleted successfully"
            });
        }

        await Movie.findByIdAndDelete(req.params.id);

        return res.json({
            message: "Movie deleted successfully"
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};