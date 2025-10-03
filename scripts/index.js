// Suggested questions for leading user with answers
const suggestedQuestions = [
  {
    question: "Tell me about your services?",
    keywords: ["full service", "services", "specialize", "question 1", "1"],
    answer: "We specialize in accordance to your business objectives. For more visit our 'services' page."
  },
  {
    question: "What's your strategy building process",
    keywords: ["process", "digital communication", "strategy", "question 2", "2"],
    answer: "Research(What) Action(Cause) Communication(How) Evaluate(Effect). RACE Model "
  },
  {
    question: "How do you measure success?",
    keywords: ["measure", "success", "roi", "question 3", "3"],
    answer: "With the help of KPI's (Key Performance Indicators) and analytic tools we create extensive reports."
  },
  {
    question: "What is your pricing model?",
    keywords: ["pricing", "hourly", "project", "retainer", "question 4", "4"],
    answer: "Project based fees/payments."
  },
  {
    question: "What kind of content do you create?",
    keywords: ["content", "videos", "infographic", "blog posts", "question 5", "5"],
    answer: "We create videos content based on our client's goals and target audience."
  }
];

// Function to display a message
function displayMessage(msg, type) {
  const messagesDiv = document.getElementById("chatbot-messages");
  const bubbleClass = type === "user" ? "user-msg" : "bot-msg";
  messagesDiv.innerHTML += `<div class="${bubbleClass}">${msg}</div>`;
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function displayTyping(answer) {
  const messagesDiv = document.getElementById("chatbot-messages");

  // Create a bot bubble with animated dots
  const typingBubble = document.createElement("div");
  typingBubble.className = "bot-msg";
  typingBubble.innerHTML = `<div class="typing"><span></span><span></span><span></span></div>`;
  messagesDiv.appendChild(typingBubble);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;

  // Replace dots with actual answer after 3.5 seconds
  setTimeout(() => {
    typingBubble.innerHTML = answer;
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  }, 3500);
}


// Get response based on keywords
function getResponse(userInput) {
  const cleaned = userInput.toLowerCase();

  // Check each suggested question
  for (let faq of suggestedQuestions) {
    if (faq.keywords.some(keyword => cleaned.includes(keyword))) {
      return faq.answer;
    }
  }

  // Friendly fallback
  const fallbacks = [
    "Hmm, I’m not sure about that 🤔. Try selecting one of the suggested questions above!",
    "I didn’t catch that… but you can ask me about our services, pricing, or content creation.",
    "I’m still learning! Try one of the suggested questions I listed."
  ];
  return fallbacks[Math.floor(Math.random() * fallbacks.length)];
}

// Toggle chatbot window (show/hide) AND show suggested questions
document.getElementById("chatbot-button").addEventListener("click", () => {
  const win = document.getElementById("chatbot-window");
  const input = document.getElementById("chatbot-input");
  win.classList.toggle("hidden");

  // If opening, show suggested questions
  if (!win.classList.contains("hidden")) {
    const messagesDiv = document.getElementById("chatbot-messages");
    messagesDiv.innerHTML = "";

    displayMessage(
      "Welcome to WEMAS agency! Here are some FAQs I can answer:",
      "bot"
    );

    suggestedQuestions.forEach((q, index) => {
      displayMessage(`${index + 1}. ${q.question}`, "bot");
    });

    input.focus();
  }
});

// Handle user input
document.getElementById("chatbot-input").addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    const inputVal = e.target.value;
    displayMessage(inputVal, "user"); // user message
    const response = getResponse(inputVal);
    displayMessage(response); // bot response
    e.target.value = "";
  }
});



