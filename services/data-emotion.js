import apiConfig from './apiConfig'; // Importando a configuração da API

// URL base do backend para facilitar a reutilização
const BASE_URL = `${apiConfig.baseUrl}/emotions`; // Usando a URL base da configuração

// Função para registrar uma nova emoção
export async function addEmotion(userId, emotion, intensity, description, date) {
  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userId}`, // Incluindo o token do usuário
      },
      body: JSON.stringify({
        emotion,
        intensity,
        description,
        date,
      }),
    });

    if (!response.ok) {
      throw new Error(`Erro ao registrar emoção: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro na função addEmotion:', error);
    throw error;
  }
}

// Função para buscar emoções de um usuário específico
export async function getEmotions(userId) {
  try {
    const response = await fetch(BASE_URL, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${userId}`, // Incluindo o token do usuário
      },
    });

    if (!response.ok) {
      throw new Error(`Erro ao buscar emoções: ${response.statusText}`);
    }

    const data = await response.json();
    return data.emotions; // Retornando apenas as emoções
  } catch (error) {
    console.error('Erro na função getEmotions:', error);
    throw error;
  }
}
