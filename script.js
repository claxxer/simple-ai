// JavaScript for Chatbot Functionality
document.getElementById("sendButton").addEventListener("click", sendMessage);
document.getElementById("userInput").addEventListener("keypress", function(event) {
    if (event.key === "Enter") sendMessage();
});

async function sendMessage() {
    let userInput = document.getElementById("userInput").value;
    if (!userInput) return;
    
    let chatbox = document.getElementById("chatbox");
    chatbox.innerHTML += `<p class='user'><strong>You:</strong> ${userInput}</p>`;
    document.getElementById("userInput").value = "";
    
    let response = await fetch("https://api.openai.com/v1/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer YOUR_OPENAI_API_KEY"
        },
        body: JSON.stringify({
            model: "text-davinci-003",
            prompt: userInput,
            max_tokens: 50
        })
    });
    let data = await response.json();
    let botReply = data.choices[0].text.trim();
    
    chatbox.innerHTML += `<p class='bot'><strong>Bot:</strong> ${botReply}</p>`;
    chatbox.scrollTop = chatbox.scrollHeight;
}
