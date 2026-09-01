const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

require("dotenv").config();

const app = express();
const Movie = require("./models/Movie");
const Theatre = require("./models/Theatre");
const Show = require("./models/Show");

const frontendPath = path.join(__dirname, "..", "Frontend");

// Middleware
app.use(cors());
app.use(express.json());

// Frontend folder
app.use(express.static(frontendPath));

async function seedInitialData() {
    try {
        const existingHindiMovies = await Movie.find({ language: /^Hindi$/i });

        if (movies.length === 0) {
            const seededMovies = await Movie.insertMany([
                {
                    title: "3 Idiots",
                    genre: "Comedy / Drama",
                    language: "Hindi",
                    duration: "170 min",
                    rating: 8.4,
                    description: "Two friends revisit their college days and realize how far they have come in life.",
                    poster: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80"
                },
                {
                    title: "Dangal",
                    genre: "Sports / Drama",
                    language: "Hindi",
                    duration: "161 min",
                    rating: 8.4,
                    description: "A father trains his daughters to become champions in the face of social challenges.",
                    poster: "https://images.unsplash.com/photo-1513106580091-1d82408b8cd6?auto=format&fit=crop&w=800&q=80"
                },
                {
                    title: "Pathaan",
                    genre: "Action / Thriller",
                    language: "Hindi",
                    duration: "146 min",
                    rating: 7.5,
                    description: "A spy returns for a secret mission that puts the entire world at risk.",
                    poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=800&q=80"
                }
            ]);

            const theatre = await Theatre.create({
                name: "CineMax Plaza",
                location: "Downtown"
            });

            for (const movie of movies) {
                await Show.create({
                    movieId: movie._id,
                    theatreId: theatre._id,
                    showDate: "2026-09-01",
                    showTime: "18:30",
                    price: 200
                });
            }

            console.log("Seeded Hindi-only movie data");
        }

        const showCount = await Show.countDocuments();
        if (showCount === 0) {
            const movie = await Movie.findOne({ language: /^Hindi$/i });
            const theatre = await Theatre.findOne();

            if (movie && theatre) {
                await Show.create({
                    movieId: movie._id,
                    theatreId: theatre._id,
                    showDate: "2026-09-02",
                    showTime: "20:15",
                    price: 220
                });
                console.log("Seeded fallback Hindi show data");
            }
        }
    } catch (error) {
        console.log("Seeding Error:", error.message);
    }
}

// MongoDB connection
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB Connected");
        seedInitialData();
    })
    .catch((error) => {
        console.log("MongoDB Error:", error);
    });

// Routes
const authRoutes = require("./routes/authRoutes");
const movieRoutes = require("./routes/movieRoutes");
const showRoutes = require("./routes/showRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/shows", showRoutes);
app.use("/api/bookings", bookingRoutes);

// Home
app.get("/", (req, res) => {
    res.sendFile(
        path.join(frontendPath, "index.html")
    );
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});