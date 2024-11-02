    let selectedEmotion = null;
    document.querySelectorAll('.emotion-button').forEach(button => {
        button.addEventListener('click', () => {
            // Remove a classe 'selected' de todos os botões
            document.querySelectorAll('.emotion-button').forEach(btn => btn.classList.remove('selected'));
    
            // Adiciona a classe 'selected' ao botão clicado
            button.classList.add('selected');
            selectedEmotion = button.getAttribute('data-emotion');
            console.log(`Emoção selecionada: ${selectedEmotion}`);
        });
    });

    document.querySelector('.register-emotion-btn').addEventListener('click', async (event) => {
        event.preventDefault();
    
        if (!selectedEmotion) {
            alert('Por favor, selecione uma emoção antes de registrar.');
            return;
        }
    
        const description = document.querySelector('#description').value;
        const token = localStorage.getItem('token');
    
        if (!token) {
            alert('Você precisa fazer login primeiro.');
            return;
        }
    
        try {
            const response = await fetch('http://localhost:3000/emotions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    emotion: selectedEmotion,
                    description: description,
                    date: new Date().toISOString()
                })
            });
    
            const data = await response.json();
    
            if (response.ok) {
                openPopup();
                await fetchAndRenderEmotions();
            } else {
                alert(`Erro: ${data.message}`);
            }
        } catch (error) {
            console.error('Erro ao registrar emoção:', error);
            alert('Erro ao registrar emoção. Tente novamente mais tarde.');
        }
    });
    
    // Função para abrir o pop-up
    function openPopup() {
        document.getElementById('popupSuccess').style.display = 'flex';
    }
    
    // Função para fechar o pop-up
    function closePopup() {
        // Limpa a descrição
        document.querySelector('#description').value = '';
    
        // Redefine a emoção selecionada
        selectedEmotion = null;
    
        // Remove a classe 'selected' de todos os botões
        document.querySelectorAll('.emotion-button').forEach(btn => {
            btn.classList.remove('selected');
        });
    
        // Oculta o pop-up
        document.getElementById('popupSuccess').style.display = 'none';

        fetchAndRenderEmotions();
    }
    
    