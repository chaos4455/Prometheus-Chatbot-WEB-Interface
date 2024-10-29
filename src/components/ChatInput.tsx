import { useState, useRef, useEffect } from 'react';
import { Send, Loader2, Paperclip, Image, Mic, Star } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => Promise<void>;
  isProcessing: boolean;
  theme: 'light' | 'dark';
  onFeatureClick: (feature: string) => void;
}

export const ChatInput = ({ onSendMessage, isProcessing, theme, onFeatureClick }: ChatInputProps) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isProcessing) {
      try {
        await onSendMessage(message);
        setMessage('');
      } catch (error) {
        console.error('Erro ao enviar mensagem:', error);
      }
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = '24px';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  return (
    <div className="fixed bottom-20 left-0 right-0 z-40">
      <form onSubmit={handleSubmit} className="max-w-5xl mx-auto px-4">
        <div className="relative flex items-end gap-2 rounded-2xl border border-gray-700 bg-gray-800/90 backdrop-blur-lg p-4 shadow-lg">
          <div className="flex items-center gap-2 -ml-2">
            <button
              type="button"
              onClick={() => onFeatureClick('Anexar Arquivo')}
              className="p-2 rounded-lg hover:bg-gray-700 transition-colors"
              title="Anexar arquivo"
            >
              <Paperclip className="w-5 h-5 text-gray-400" />
            </button>
            <button
              type="button"
              onClick={() => onFeatureClick('Enviar Imagem')}
              className="p-2 rounded-lg hover:bg-gray-700 transition-colors"
              title="Enviar imagem"
            >
              <Image className="w-5 h-5 text-gray-400" />
            </button>
            <button
              type="button"
              onClick={() => onFeatureClick('Mensagem de Voz')}
              className="p-2 rounded-lg hover:bg-gray-700 transition-colors"
              title="Mensagem de voz"
            >
              <Mic className="w-5 h-5 text-gray-400" />
            </button>
            <button
              type="button"
              onClick={() => onFeatureClick('Recursos Premium')}
              className="p-2 rounded-lg hover:bg-gray-700 transition-colors"
              title="Recursos premium"
            >
              <Star className="w-5 h-5 text-yellow-500" />
            </button>
          </div>

          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
            placeholder="Digite sua mensagem..."
            disabled={isProcessing}
            className="flex-1 bg-transparent pl-2 -ml-2 text-white placeholder-gray-400 resize-none outline-none disabled:opacity-50"
            rows={1}
            style={{ maxHeight: '200px', minHeight: '24px' }}
          />
          <button
            type="submit"
            disabled={isProcessing || !message.trim()}
            className="p-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-50 transition-colors"
          >
            {isProcessing ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </div>
      </form>
    </div>
  );
};