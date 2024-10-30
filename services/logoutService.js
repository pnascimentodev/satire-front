document.getElementById('logout-button').addEventListener('click', async (event) => {
    event.preventDefault();

    try {
        const response = await fetch('http://localhost:3000/users/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}` 
            },
        });

        if (response.ok) {
            localStorage.removeItem('token');
            localStorage.removeItem('name');  

            window.location.href = 'login.html';
        } else {
            const errorData = await response.json();
            alert(`Erro: ${errorData.error}`);
        }
    } catch (error) {
        console.error('Erro ao fazer logout:', error);
        alert('Erro ao tentar realizar logout.');
    }
});
