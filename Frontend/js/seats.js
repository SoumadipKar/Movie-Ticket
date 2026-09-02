const seatContainer =
    document.getElementById("seatContainer");


const selectedSeatsElement =
    document.getElementById("selectedSeats");


const totalElement =
    document.getElementById("total");


const params =
    new URLSearchParams(
        window.location.search
    );


const movieId =
    params.get("movieId");


const seatPrice = 200;


let selectedSeats = [];


const seatNames = [];


// Generate A1-A8, B1-B8, etc.
for (let row = 0; row < 6; row++) {

    const letter =
        String.fromCharCode(65 + row);


    for (let number = 1; number <= 8; number++) {

        seatNames.push(
            letter + number
        );

    }

}


seatNames.forEach(seatName => {

    const seat =
        document.createElement("div");


    seat.className = "seat";

    seat.innerText = seatName;


    seat.addEventListener(
        "click",
        () => {

            if (
                seat.classList.contains("booked")
            ) {
                return;
            }


            seat.classList.toggle(
                "selected"
            );


            if (
                selectedSeats
                .includes(seatName)
            ) {

                selectedSeats =
                    selectedSeats.filter(
                        s => s !== seatName
                    );

            } else {

                selectedSeats.push(
                    seatName
                );

            }


            updateSummary();

        }
    );


    seatContainer.appendChild(seat);

});


function updateSummary() {

    selectedSeatsElement.innerText =
        selectedSeats.length
            ? selectedSeats.join(", ")
            : "None";


    totalElement.innerText =
        selectedSeats.length *
        seatPrice;

}


async function continueBooking() {
    if (selectedSeats.length === 0) {
        alert("Please select at least one seat.");
        return;
    }

    const user =
        JSON.parse(
            localStorage.getItem("user")
        );

    if (!user) {
        alert("Please login first.");
        window.location.href = "login.html";
        return;
    }

    try {
        const response = await fetch(
            `/api/shows/movie/${movieId}`
        );
        const shows = await response.json();

        if (!shows || shows.length === 0) {
            alert("No show is available for this movie right now.");
            return;
        }

        const selectedShow = shows[0];
        const theatreId = selectedShow.theatreId?._id || selectedShow.theatreId;
        const showId = selectedShow._id;

        localStorage.setItem("showId", showId);
        localStorage.setItem("theatreId", theatreId);

        localStorage.setItem(
            "bookingData",
            JSON.stringify({
                userId: user.id,
                movieId: movieId,
                theatreId: theatreId,
                showId: showId,
                seats: selectedSeats,
                totalAmount: selectedSeats.length * seatPrice
            })
        );

        window.location.href = "booking.html";
    } catch (error) {
        alert("Unable to load show details. Please try again.");
    }
}