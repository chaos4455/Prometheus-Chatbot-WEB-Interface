import { Message } from '../types';
import { motion } from 'framer-motion';
import { ThumbsUp, ThumbsDown, Copy, RotateCcw, Share2, Bookmark } from 'lucide-react';
import { renderMarkdown } from '../utils/markdown';
import { themes } from '../config/themes';
import { formatDistanceToNow } from '../utils/dateUtils';

interface ChatMessageProps {
  message: Message;
  theme: 'light' | 'dark';
  isTyping?: boolean;
}

export const ChatMessage = ({ message, theme }: ChatMessageProps) => {
  const isBot = message.role === 'assistant';
  const messageTime = new Date(message.timestamp).toLocaleString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    day: '2-digit',
    month: '2-digit',
    year: '2-digit'
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`py-4 ${isBot ? 'bg-gray-800/50 w-full' : ''}`}
    >
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex items-start gap-4">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
            isBot ? 'bg-emerald-600/20 text-emerald-500' : 'bg-violet-600/20 text-violet-500'
          }`}>
            {isBot ? '🤖' : '👤'}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <span className="font-medium text-gray-200 text-sm">
                {isBot ? 'Assistente IA' : 'Você'}
              </span>
              <span className="text-xs text-gray-400 font-mono">
                {messageTime}
              </span>
            </div>

            <div 
              className="prose prose-invert prose-emerald max-w-none
                prose-pre:bg-gray-900 prose-pre:border prose-pre:border-gray-700
                prose-code:text-emerald-400 prose-code:bg-gray-900/50 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
                prose-a:text-emerald-400 prose-a:no-underline hover:prose-a:underline
                prose-blockquote:border-emerald-500
                prose-strong:text-emerald-400
                prose-headings:text-gray-100
                break-words whitespace-pre-wrap"
              dangerouslySetInnerHTML={renderMarkdown(message.content)}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};