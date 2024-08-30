document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    // Get the username from the input field
    const username = document.getElementById('username').value;

    // Store the username in localStorage
    localStorage.setItem('username', username);

    // Redirect to the chat page
    window.location.href = 'index.html';
});
