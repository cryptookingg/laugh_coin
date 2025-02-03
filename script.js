document.getElementById('questionForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const questionInput = document.getElementById('questionInput');
    const responseDiv = document.getElementById('response');
    const question = questionInput.value.trim();

    if (!question) {
        responseDiv.innerHTML = `<div class="alert alert-warning">Please enter a question first! 🤔</div>`;
        return;
    }

    // Show loading message
    responseDiv.innerHTML = `<div class="alert alert-info">Thinking... 🤖💭</div>`;

    const mistralApiKey = "J9U4UCOEyboOjjI9nYZdDsW9tyiTXnsr"; // ⚠️ Keeping API key in frontend

    try {
        const response = await fetch("https://api.mistral.ai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${mistralApiKey}`,
            },
            body: JSON.stringify({
                model: "mistral-small", // You can change this to "mistral-medium" for better responses
                messages: [
                    {
                        role: "system",
                        content: "You are a sarcastic, meme-obsessed AI oracle. Respond with absurd humor, crypto jokes, flirty replies, and pop culture. Keep it under 2 sentences. Add emojis where needed.",
                    },
                    { role: "user", content: question }
                ],
                temperature: 0.9, // Higher = more creative/funny
                max_tokens: 100, // Limits response length
            }),
        });

        if (!response.ok) throw new Error(`API error: ${response.status}`);

        const data = await response.json();
        const memeResponse = data.choices?.[0]?.message?.content || "LOL, I got nothing! 😂";

        // Display the response
        responseDiv.innerHTML = `
            <div class="alert alert-success">
                <strong>Question:</strong> ${question}<br>
                <strong>Response:</strong> ${memeResponse}
            </div>
        `;

        // Clear input after submission
        questionInput.value = "";
    } catch (error) {
        console.error("Error fetching response:", error);
        responseDiv.innerHTML = `<div class="alert alert-danger">Oops! Something went wrong. Try again later. 😢</div>`;
    }
});
