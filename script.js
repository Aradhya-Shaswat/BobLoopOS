document.addEventListener('DOMContentLoaded', function() {
    const loader = document.getElementById('loader');
    const loginScreen = document.getElementById('login-screen');
    const desktopTerminal = document.getElementById('desktop-terminal');
    const loginButton = document.getElementById('login-button');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');

    let filesList = ['file1.txt', 'file2.txt', 'folder1', 'folder2'];

    function handleLogin() {
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        if (username === 'admin' && password === 'admin123') {
            alert('Login successful!');
            loginScreen.style.display = 'none';
            desktopTerminal.style.display = 'block';
        } else {
            alert('Invalid username or password.');
        }
    }

    loader.style.display = 'flex';

    setTimeout(() => {
        loader.style.display = 'none';
        loginScreen.style.display = 'block';
    }, 3000); 

    loginButton.addEventListener('click', function(event) {
        event.preventDefault();
        handleLogin();
    });

    usernameInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            passwordInput.focus();
        }
    });

    passwordInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleLogin();
        }
    });

    loginButton.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleLogin();
        }
    });

    const terminalInput = document.getElementById('terminal-input');
    terminalInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            const command = terminalInput.value.trim();
            const screen = desktopTerminal.querySelector('.screen');
            const output = document.createElement('div');
            output.classList.add('output');
            output.textContent = `$ ${command}`;
            screen.appendChild(output);

            const response = document.createElement('div');
            response.classList.add('output');
            switch (command.toLowerCase()) {
                case 'help':
                    response.textContent = 'Available commands: cat, ls, touch, help';
                    break;
                case 'cat':
                    response.textContent = 'Usage: cat [filename] - Display contents of a file';
                    break;
                case 'ls':
                    listDirectory(response);
                    break;
                case 'touch':
                    const newFile = createNewFile();
                    response.textContent = `Created file: ${newFile}`;
                    filesList.push(newFile);
                    break;
                default:
                    response.textContent = `Command not found: ${command}`;
                    break;
            }
            screen.appendChild(response);

            terminalInput.value = '';
            screen.scrollTop = screen.scrollHeight;
        }
    });

    function listDirectory(responseElement) {
        if (filesList.length === 0) {
            responseElement.textContent = 'No files found.';
        } else {
            filesList.forEach(file => {
                const fileElement = document.createElement('div');
                fileElement.textContent = file;
                responseElement.appendChild(fileElement);
            });
        }
    }
    function createNewFile() {
        return `newfile${filesList.length + 1}.txt`;
    }
});
