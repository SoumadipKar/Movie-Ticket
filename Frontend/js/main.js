
fetch("/api/movies/hindi")

    .then(response => response.json())

    .then(movies => {

        const container =
            document.getElementById("movieContainer");


        container.innerHTML =
            movies.slice(0, 6)
            .map(movie => `

                <div class="movie-card">

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

                        <a
                            href="movie-details.html?id=${movie._id}"
                            class="btn">

                            View Details

                        </a>

                    </div>

                </div>

            `)
            .join("");

    })

    .catch(error => {

        console.log(error);

    });