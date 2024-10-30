// Suponha que você tenha um array de datas com registros de emoção
const emotionRecords = [
    '2024-10-01', 
    '2024-10-05', 
    '2024-10-10',
    '2024-10-11',
    '2024-10-13',
    '2024-10-25',
];

let currentMonthIndex = 9; // Outubro (0 = Janeiro)
let currentYear = 2024;

// Função para criar o mapa emocional
function createEmotionalMap() {
    const mapContainer = document.getElementById('emotional-map');
    mapContainer.innerHTML = ''; // Limpa o mapa antes de desenhar novamente

    // Obter o primeiro e último dia do mês
    const firstDay = new Date(currentYear, currentMonthIndex, 1);
    const lastDay = new Date(currentYear, currentMonthIndex + 1, 0);
    
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
    updateMonthDisplay(); // Atualiza o mês exibido aqui
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
