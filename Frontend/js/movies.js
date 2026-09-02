let allMovies = [];


const movieContainer =
    document.getElementById("movies");


async function loadMovies() {

    try {

        const response =
            await fetch(
                "/api/movies/hindi"
            );

        allMovies =
            await response.json();

        displayMovies(allMovies);

    } catch (error) {

        movieContainer.innerHTML =
            "<p>Unable to load movies.</p>";

    }

}


function displayMovies(movies) {

    movieContainer.innerHTML = "";


    movies.forEach(movie => {

        const card =
            document.createElement("div");

        card.className =
            "movie-card";


        card.innerHTML = `

            <img
                src="${movie.poster}"
                alt="${movie.title}"
            >

            <div class="movie-info">

                <h3>
                    ${movie.title}
                </h3>

                <p>
                    ⭐ ${movie.rating}
                </p>

                <p>
                    ${movie.genre}
                </p>

                <p>
                    ${movie.language}
                </p>

                <a
                    href="movie-details.html?id=${movie._id}"
                    class="btn">

                    Book Now

                </a>

            </div>

        `;


        movieContainer.appendChild(card);

    });

}


document
.getElementById("search")
.addEventListener("input", function() {

    const search =
        this.value.toLowerCase();


    const filtered =
        allMovies.filter(movie =>
            movie.title
                .toLowerCase()
                .includes(search)
        );


    displayMovies(filtered);

});


loadMovies();