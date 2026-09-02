const bookingData =
    JSON.parse(
        localStorage.getItem("bookingData")
    );

const details =
    document.getElementById(
        "bookingDetails"
    );

if (!bookingData) {
    details.innerHTML =
        "<p>No booking information found.</p>";
} else {
    const showId =
        localStorage.getItem("showId") ||
        bookingData.showId;

    const theatreId =
        localStorage.getItem("theatreId") ||
        bookingData.theatreId;

    details.innerHTML = `
        <p>
            <strong>Movie ID:</strong>
            ${bookingData.movieId}
        </p>
        <p>
            <strong>Selected Seats:</strong>
            ${bookingData.seats.join(", ")}
        </p>
        <p>
            <strong>Total Amount:</strong>
            ₹${bookingData.totalAmount}
        </p>
        <p>
            <strong>Show ID:</strong>
            ${showId}
        </p>
        <p>
            <strong>Theatre ID:</strong>
            ${theatreId}
        </p>
    `;
}

async function confirmBooking() {
    if (!bookingData) {
        alert("Booking information missing.");
        return;
    }

    const showId =
        localStorage.getItem("showId") ||
        bookingData.showId;

    const theatreId =
        localStorage.getItem("theatreId") ||
        bookingData.theatreId;

    if (!showId || !theatreId) {
        alert(
            "Please select a valid show and theatre first."
        );
        return;
    }

    try {
        const response =
            await fetch(
                "/api/bookings",
                {
                    method: "POST",
                    headers: {
                        "Content-Type":
                            "application/json"
                    },
                    body: JSON.stringify({
                        userId: bookingData.userId,
                        movieId: bookingData.movieId,
                        theatreId: theatreId,
                        showId: showId,
                        seats: bookingData.seats,
                        totalAmount: bookingData.totalAmount
                    })
                }
            );

        const data =
            await response.json();

        if (response.ok) {
            localStorage.removeItem("bookingData");
            localStorage.removeItem("showId");
            localStorage.removeItem("theatreId");
            alert("🎉 Booking Successful!");
            window.location.href =
                "my-bookings.html";
        } else {
            alert(data.message);
        }

    } catch (error) {
        alert("Unable to connect to server.");
    }
}