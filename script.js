document.getElementById('questionForm').addEventListener('submit', async function (e) {
      e.preventDefault();
      const question = document.getElementById('questionInput').value;

      const openaiApiKey = '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'; // Replace with your actual OpenAI API key

      async function getFunnyResponse(question) {
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
                { role: 'system', content: 'You are a funny AI that responds to questions with humorous and meme-worthy answers.' },
                { role: 'user', content: question },
              ],
            }),
          });

          const data = await response.json();
          return data.choices[0].message.content;
        } catch (error) {
          console.error('Error fetching response:', error);
          return 'Oops! Something went wrong. Please try again later.';
        }
      }

      const randomResponse = await getFunnyResponse(question);

      // Display the response
      document.getElementById('response').innerHTML = `
        <div class="alert alert-success">
          <strong>Question:</strong> ${question}<br>
          <strong>Response:</strong> ${randomResponse}
        </div>
      `;
    });
