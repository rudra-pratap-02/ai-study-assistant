const sendBtn = document.getElementById("send-btn");
const userInput = document.getElementById("user-input");
const chatBox = document.getElementById("chat-box");

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