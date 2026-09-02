document
.getElementById("loginForm")
.addEventListener("submit", async function(e) {

    e.preventDefault();


    const email =
        document.getElementById("email").value;

    const password =
        document.getElementById("password").value;


    try {

        const response =
            await fetch(
                "/api/auth/login",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({
                        email,
                        password
                    })
                }
            );


        const data =
            await response.json();


        document.getElementById("message")
            .innerText = data.message;


        if (response.ok) {

            localStorage.setItem(
                "token",
                data.token
            );


            localStorage.setItem(
                "user",
                JSON.stringify(data.user)
            );


            setTimeout(() => {

                window.location.href =
                    "index.html";

            }, 1000);

        }

    } catch (error) {

        document.getElementById("message")
            .innerText =
            "Server connection failed.";

    }

});