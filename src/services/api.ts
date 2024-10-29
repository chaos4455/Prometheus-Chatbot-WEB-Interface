import { Message } from '../types';

const API_URL = 'http://localhost:8999/chat';

interface ApiResponse {
  response: string;
  status: number;
}

export const chatService = {
  async sendMessage(message: string): Promise<Message> {
    const startTime = Date.now();
    
    try {
      console.log('Enviando mensagem para a API...');
      
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          message: message.trim() 
        }),
      });

      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }

      const data: ApiResponse = await response.json();
      
      return {
        id: crypto.randomUUID(),
        content: data.response,
        role: 'assistant',
        timestamp: Date.now(),
        processingTime: Date.now() - startTime,
      };
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      throw new Error('Não foi possível se comunicar com o servidor. Tente novamente mais tarde.');
    }
  },

  async checkStatus(): Promise<boolean> {
    try {
      const response = await fetch(`${API_URL}/status`);
      return response.ok;
    } catch {
      return false;
    }
  }
};