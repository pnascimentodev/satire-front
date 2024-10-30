document.getElementById('registerBtn').addEventListener('click', async () => {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!name || !email || !password) {
        alert('Todos os campos são obrigatórios.');
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });

        const data = await response.json();
        
        if (response.ok) {
            alert('Usuário registrado com sucesso!');
            window.location.href = 'login.html';
        } else {
            alert(`Erro: ${data.error}`);
        }
    } catch (error) {
        console.error('Erro ao registrar usuário:', error);
        alert('Erro ao registrar usuário. Tente novamente mais tarde.');
    }
});
