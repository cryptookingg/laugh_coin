    document.getElementById('questionForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const question = document.getElementById('questionInput').value;

    const mistralApiKey = "J9U4UCOEyboOjjI9nYZdDsW9tyiTXnsr"; // Replace with your actual Mistral API key

    try {
        const response = await fetch("https://api.mistral.ai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${mistralApiKey}`,
            },
            body: JSON.stringify({
                model: "mistral-small", // You can use "mistral-medium" for better responses
                messages: [
                    {
                        role: "system",
                        content: "You are a sarcastic, meme-obsessed AI oracle. Respond to questions with absurd humor, internet slang, crypto jokes, naughty talks, flirty replies and pop culture. Always keep answers under 2 sentences. Add emojis or images to answer.",
                    },
                    { role: "user", content: question }
                ],
                temperature: 0.9, // Controls randomness (higher = more fun)
                max_tokens: 100, // Limits response length
            }),
        });

        const data = await response.json();
        const memeResponse = data.choices[0].message.content;

        // Display the response
        document.getElementById('response').innerHTML = `
            <div class="alert alert-success">
                <strong>Question:</strong> ${question}<br>
                <strong>Response:</strong> ${memeResponse}
            </div>
        `;
    } catch (error) {
        console.error("Error fetching response:", error);
        document.getElementById('response').innerHTML = `
            <div class="alert alert-danger">Oops! Something went wrong. Try again.</div>
        `;
    }
});
