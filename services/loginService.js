document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault(); 

    const email = document.querySelector('input[name="email"]').value;
    const password = document.querySelector('input[name="password"]').value;

    if (!email || !password) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('name', data.name);

            const decodedToken = jwt_decode(data.token); 
            const isExpired = decodedToken.exp * 1000 < Date.now();
            if (isExpired) {
                console.log('O token está expirado.');
                alert('O token está expirado. Por favor, faça login novamente.');
                return;
            }

            window.location.href = 'dashboard.html';
        } else {
            alert(`Erro: ${data.error}`);
        }
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        alert('Erro ao fazer login. Tente novamente mais tarde.');
    }
});
