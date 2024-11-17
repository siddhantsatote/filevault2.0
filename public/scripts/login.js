document.addEventListener('DOMContentLoaded', () => {
    const output = document.getElementById('output');
    const terminalInput = document.getElementById('terminal-input');
    let username = '';
    let password = '';

    function addOutput(text) {
        output.innerHTML += text + '<br>';
        output.scrollTop = output.scrollHeight;
    }

    function attemptLogin() {
        fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                addOutput('Login successful! Redirecting...');
                setTimeout(() => {
                    window.location.href = '/upload';
                }, 2000);
            } else {
                addOutput('Error: Invalid credentials');
                username = '';
                addOutput('Enter your username:');
            }
        })
        .catch(error => {
            addOutput('An error occurred. Please try again later.');
            console.error('Error:', error);
        });
    }

    terminalInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            const input = terminalInput.value.trim();
            terminalInput.value = '';

            if (!username) {
                username = input;
                addOutput(`Username: ${username}`);
                addOutput('Enter your password:');
            } else {
                password = input;
                addOutput(`Password: ${'*'.repeat(password.length)}`);
                attemptLogin();
            }
        }
    });

    addOutput('Welcome to the terminal login.');
    addOutput('Enter your username:');
});
