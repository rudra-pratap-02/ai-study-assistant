const sendBtn = document.getElementById("send-btn");
const userInput = document.getElementById("user-input");

sendBtn.addEventListener("click", sendMessage);

userInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});

function sendMessage() {

    const message = userInput.value.trim();

    if (message === "") return;

    // User message
    const userDiv = document.createElement("div");
    userDiv.classList.add("message", "user");
    userDiv.textContent = message;
    chatBox.appendChild(userDiv);

    // Dummy AI reply
    const aiDiv = document.createElement("div");
    aiDiv.classList.add("message", "ai");
    aiDiv.textContent = "I'm still learning. Soon I'll connect to the backend!";
    chatBox.appendChild(aiDiv);

    userInput.value = "";

    // Auto-scroll
    chatBox.scrollTop = chatBox.scrollHeight;
}

const chatBox = document.getElementById('chat-box');

// Helper function to append messages into the DOM
function appendMessage(text, sender) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    
    if (sender === 'user') {
        messageElement.classList.add('user-message');
    } else {
        messageElement.classList.add('ai-message');
    }
    
    messageElement.innerText = text;
    chatBox.appendChild(messageElement);
    
    // Auto-scroll to the bottom of the chat
    chatBox.scrollTop = chatBox.scrollHeight;
}