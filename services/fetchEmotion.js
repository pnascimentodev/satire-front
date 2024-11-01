document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');

    if (!token) {
        alert('Você precisa fazer login primeiro.');
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/emotions', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();
        if (response.ok) {
            renderEmotionChart(data.emotionCounts);
        } else {
            console.error('Erro ao buscar emoções:', data.message);
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
    }
});

function renderEmotionChart(emotionCounts) {
    const labels = Object.keys(emotionCounts);
    const counts = Object.values(emotionCounts);

    const ctx = document.querySelector('.chart-placeholder').getContext('2d');
    new Chart(ctx, {
        type: 'bar', // Troque para 'pie' se preferir um gráfico de pizza
        data: {
            labels: labels,
            datasets: [{
                label: 'Emoções dos últimos 30 dias',
                data: counts,
                backgroundColor: [
                    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF' // Adicione mais cores se necessário
                ],
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}