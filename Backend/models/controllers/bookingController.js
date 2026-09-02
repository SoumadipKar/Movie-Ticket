const Booking = require("../../models/Booking");

exports.createBooking = async (req, res) => {
    try {
        const {
            userId,
            movieId,
            theatreId,
            showId,
            seats,
            totalAmount
        } = req.body;

        if (!userId || !movieId || !theatreId || !showId || !seats) {
            return res.status(400).json({
                message: "Missing booking information"
            });
        }

        const booking = await Booking.create({
            userId,
            movieId,
            theatreId,
            showId,
            seats,
            totalAmount
        });

        res.status(201).json({
            message: "Booking successful",
            booking
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


exports.getUserBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({
            userId: req.params.userId
        })
            .populate("movieId")
            .populate("theatreId")
            .populate("showId")
            .sort({
                createdAt: -1
            });

        res.json(bookings);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


exports.cancelBooking = async (req, res) => {
    try {
        const booking = await Booking.findByIdAndUpdate(
            req.params.id,
            {
                status: "cancelled"
            },
            {
                new: true
            }
        );

        res.json({
            message: "Booking cancelled",
            booking
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};