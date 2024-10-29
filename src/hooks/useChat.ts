import { useState, useCallback } from 'react';
import { Message } from '../types';
import { chatService } from '../services/api';
import { toast } from 'sonner';
import { useChatStore } from '../store/chat-store';

export function useChat() {
  const { sessions, currentSessionId, addMessage } = useChatStore();
  const [isProcessing, setIsProcessing] = useState(false);

  const currentMessages = sessions.find(s => s.id === currentSessionId)?.messages || [];

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim() || !currentSessionId) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      content: content.trim(),
      role: 'user',
      timestamp: Date.now(),
    };

    addMessage(userMessage);
    setIsProcessing(true);

    try {
      const botResponse = await chatService.sendMessage(content);
      addMessage(botResponse);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Erro ao processar mensagem');
      
      const errorMessage: Message = {
        id: crypto.randomUUID(),
        content: "Desculpe, ocorreu um erro ao processar sua mensagem. Por favor, tente novamente.",
        role: 'assistant',
        timestamp: Date.now(),
        error: true,
      };
      addMessage(errorMessage);
    }

    setIsProcessing(false);
  }, [currentSessionId, addMessage]);

  return { messages: currentMessages, isProcessing, sendMessage };
} 