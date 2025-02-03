document.getElementById('questionForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const question = document.getElementById('questionInput').value;

    try {
        const response = await fetch("https://v2.jokeapi.dev/joke/Any?format=json");
        const data = await response.json();

        let joke;
        if (data.type === "single") {
            joke = data.joke;
        } else {
            joke = `${data.setup} - ${data.delivery}`;
        }

        // Display the joke
        document.getElementById('response').innerHTML = `
            <div class="alert alert-success">
                <strong>Question:</strong> ${question}<br>
                <strong>Response:</strong> ${joke}
            </div>
        `;
    } catch (error) {
        console.error("Error fetching joke:", error);
        document.getElementById('response').innerHTML = `
            <div class="alert alert-danger">Oops! Something went wrong. Try again.</div>
        `;
    }
});
