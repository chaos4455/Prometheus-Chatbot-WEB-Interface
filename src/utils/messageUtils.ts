import emoji from 'emoji-dictionary';

export const cleanMessage = (message: string): string => {
  // Remover emojis
  message = message.replace(/:[^:\s]*(?:::[^:\s]*)*:/g, '');
  // Remover acentos
  message = message.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  // Remover símbolos não alfabéticos
  message = message.replace(/[^a-zA-Z0-9\s]/g, '');
  return message.trim();
};
