// Captura a data atual
const today = new Date();
let currentMonthIndex = today.getMonth(); // Mês atual (0 = Janeiro)
let currentYear = today.getFullYear(); // Ano atual

// Função para buscar registros de emoções a partir da API
async function fetchEmotionRecords(year, month) {
    const token = localStorage.getItem('token');

    try {
        const response = await fetch(`http://localhost:3000/emotions/by-date?year=${year}&month=${month}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Erro ao buscar emoções');
        }

        const data = await response.json();
        return data.emotionDates || []; // Retorna as datas das emoções ou um array vazio
    } catch (error) {
        console.error('Erro na requisição:', error);
        return []; // Retorna um array vazio em caso de erro
    }
}

// Função para criar o mapa emocional
async function createEmotionalMap() {
    const mapContainer = document.getElementById('emotional-map');
    mapContainer.innerHTML = ''; // Limpa o mapa antes de desenhar novamente

    // Obter o primeiro e último dia do mês
    const firstDay = new Date(currentYear, currentMonthIndex, 1);
    const lastDay = new Date(currentYear, currentMonthIndex + 1, 0);
    
    // Busca registros de emoções para o mês atual
    emotionRecords = await fetchEmotionRecords(currentYear, currentMonthIndex + 1); // Mês é zero-indexado

    // Loop pelas datas do mês
    for (let day = 1; day <= lastDay.getDate(); day++) {
        const currentDate = new Date(currentYear, currentMonthIndex, day);
        const formattedDate = currentDate.toISOString().split('T')[0]; // Formato YYYY-MM-DD

        const dayDiv = document.createElement('div');
        dayDiv.className = 'day ' + (emotionRecords.includes(formattedDate) ? 'has-emotion' : 'no-emotion');
        dayDiv.textContent = day;
        
        mapContainer.appendChild(dayDiv);
    }
    
    // Atualiza a exibição do mês atual
    updateMonthDisplay(); // Atualiza o texto do mês exibido
}

// Atualiza o texto do mês exibido
function updateMonthDisplay() {
    const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    const monthText = document.getElementById('current-month');
    monthText.textContent = `${monthNames[currentMonthIndex]} ${currentYear}`; // Atualiza o texto
}

// Função que configura os eventos de clique
function setupEventListeners() {
    document.getElementById('prev-month').addEventListener('click', () => {
        if (currentMonthIndex > 0) {
            currentMonthIndex--;
        } else {
            currentMonthIndex = 11; // Muda para Dezembro do ano anterior
            currentYear--; // Decrementa o ano
        }
        console.log(`Mês anterior: ${currentMonthIndex}, Ano: ${currentYear}`); // Log de depuração
        createEmotionalMap(); // Atualiza o mapa
    });

    document.getElementById('next-month').addEventListener('click', () => {
        if (currentMonthIndex < 11) {
            currentMonthIndex++;
        } else {
            currentMonthIndex = 0; // Muda para Janeiro do próximo ano
            currentYear++; // Incrementa o ano
        }
        console.log(`Próximo mês: ${currentMonthIndex}, Ano: ${currentYear}`); // Log de depuração
        createEmotionalMap(); // Atualiza o mapa
    });
}

// Inicializa a funcionalidade quando o DOM está carregado
document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners(); // Configura os eventos de clique
    createEmotionalMap(); // Cria o mapa emocional
});
