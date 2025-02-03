 Handle question form submission
document.getElementById('questionForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const question = document.getElementById('questionInput').value;

   // Simulate an AI response (replace with actual API call later)
  const responses = [
    To the moon! 🚀,
    Because memes make the world go round! 😂,
    Ask again later... I'm too busy laughing! 😆,
    The answer is 42. Always 42. 🤖,
  ];
  const randomResponse = responses[Math.floor(Math.random()  responses.length)];

   Display the response
  document.getElementById('response').innerHTML = `
    div class=alert alert-success
      strongQuestionstrong ${question}br
      strongResponsestrong ${randomResponse}
    div
  `;
});
