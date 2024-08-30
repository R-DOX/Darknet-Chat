const socket = io();
const userName = localStorage.getItem('username') || 'Anonymous';

// Listen for chat messages from the server
socket.on('chatMessage', (msg) => {
    addMessageToChatBox(msg.user, msg.message, false); // Add receiver's message to chat box
});

document.getElementById('send-button').addEventListener('click', function() {
    let messageInput = document.getElementById('message-input');
    let message = messageInput.value;
    if (message.trim() !== '') {
        socket.emit('chatMessage', { user: userName, message: message });
        messageInput.value = '';
        addMessageToChatBox(userName, message, true); // Add sender's message to chat box
    }
});

document.getElementById('message-input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        document.getElementById('send-button').click();
    }
});

function addMessageToChatBox(user, message, isSender) {
    let chatBox = document.getElementById('chat-box');

    if (!chatBox) {
        console.error('Chat box element not found!');
        return;
    }

    // Remove previous message if it’s a duplicate
    let messages = chatBox.getElementsByClassName('message');
    for (let msg of messages) {
        if (msg.innerHTML === `<b>${user}:</b> ${message}`) {
            return; // Avoid adding duplicate messages
        }
    }

    let messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.classList.add(isSender ? 'sent' : 'received');
    messageElement.innerHTML = `<b>${user}:</b> ${message}`;

    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}
