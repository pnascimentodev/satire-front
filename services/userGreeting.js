
const userName = localStorage.getItem('name');
    if (userName) {
        document.getElementById('user-greeting').textContent += ` ${userName}`;
    }