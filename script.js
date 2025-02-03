document.getElementById('questionForm').addEventListener('submit', async function (e) {
      e.preventDefault();
      const question = document.getElementById('questionInput').value;

      // Replace with your OpenAI API key
      const openaiApiKey = 'your-openai-api-key';

      async function getFunnyResponse(question) {
        const funnyEmojis = ['😂', '🤣', '😆', '🚀', '🍕', '🤖', '👑', '🎉', '💩', '🦄'];
        const fallbackResponses = [
          "I would tell you a joke about time travel, but you didn't like it.",
          "Why did the AI cross the road? To get to the other server!",
          "I'm not lazy, I'm just in energy-saving mode.",
          "I asked my dog for advice, but he just said 'woof.' So here's my answer: 🐶",
          "The answer is 42. But if you don't get it, you're not a true hitchhiker.",
          "I was going to give you a smart answer, but then I got distracted by a squirrel.",
          "I'm not saying you're wrong, but the odds are stacked against you like a Jenga tower.",
          "I would answer, but my mom said I shouldn't talk to strangers.",
        ];

        const loadingMessages = [
          "Hold on, I'm consulting the magic 8-ball...",
          "Asking my pet hamster for advice...",
          "Calculating the meaning of life...",
          "Searching for the answer in the meme archives...",
          "Hold my coffee while I think...",
        ];

        // Display a random loading message
        const randomLoadingMessage = loadingMessages[Math.floor(Math.random() * loadingMessages.length)];
        document.getElementById('response').innerHTML = `<div class="alert alert-info">${randomLoadingMessage}</div>`;

        try {
          const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${openaiApiKey}`,
            },
            body: JSON.stringify({
              model: 'gpt-3.5-turbo',
              messages: [
                {
                  role: 'system',
                  content: 'You are a stand-up comedian AI who loves memes, puns, and absurd humor. Your goal is to make people laugh with witty, unexpected, and over-the-top responses. Always respond in a way that is lighthearted, sarcastic, or downright ridiculous. If the question is serious, twist it into something hilarious.',
                },
                { role: 'user', content: question },
              ],
            }),
          });

          const data = await response.json();
          const aiResponse = data.choices[0].message.content;

          // Add a random emoji to the response
          const randomEmoji = funnyEmojis[Math.floor(Math.random() * funnyEmojis.length)];
          return `${aiResponse} ${randomEmoji}`;
        } catch (error) {
          console.error('Error fetching response:', error);

          // Return a random fallback response if the API call fails
          const randomFallback = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
          return randomFallback;
        }
      }

      // Get the funny response
      const funnyResponse = await getFunnyResponse(question);

      // Display the response
      document.getElementById('response').innerHTML = `
        <div class="alert alert-success">
          <strong>Question:</strong> ${question}<br>
          <strong>Answer:</strong> ${funnyResponse}
        </div>
      `;
    });
