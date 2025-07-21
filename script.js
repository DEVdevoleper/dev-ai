
const API_KEY = "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";

async function sendMessage() {
  const input = document.getElementById("user-input");
  const message = input.value;
  if (!message.trim()) return;
  appendMessage("You", message);
  input.value = "";

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${API_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-4o",
      messages: [{ role: "user", content: message }]
    })
  });

  const data = await response.json();
  const reply = data.choices?.[0]?.message?.content || "No response";
  appendMessage("DEV AI", reply);
}

function appendMessage(sender, text) {
  const container = document.getElementById("chat-container");
  const msg = document.createElement("div");
  msg.innerHTML = `<strong>${sender}:</strong> ${text}`;
  container.appendChild(msg);
  container.scrollTop = container.scrollHeight;
}

function askPreset(text) {
  document.getElementById("user-input").value = text;
  sendMessage();
}
