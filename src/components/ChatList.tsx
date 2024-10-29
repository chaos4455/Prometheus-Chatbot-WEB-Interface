import { MessageSquare, MoreVertical, Download, Edit2, Trash2, Pencil } from 'lucide-react';
import { themes } from '../config/themes';
import { ChatSession } from '../types';
import { downloadChatAsMd } from '../utils/export';
import { useState } from 'react';
import { toast } from 'sonner';

interface ChatListProps {
  chats: ChatSession[];
  currentChatId: string | null;
  onSelectChat: (chatId: string) => void;
  onDeleteChat: (chatId: string) => void;
  onRenameChat: (chatId: string, newTitle: string) => void;
  theme: 'light' | 'dark';
}

export const ChatList = ({ 
  chats = [],
  currentChatId, 
  onSelectChat, 
  onDeleteChat,
  onRenameChat,
  theme 
}: ChatListProps) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState('');

  const handleRename = (chatId: string) => {
    const chat = chats.find(c => c.id === chatId);
    if (chat) {
      setNewTitle(chat.title);
      setEditingId(chatId);
    }
  };

  const handleSaveRename = (chatId: string) => {
    if (newTitle.trim()) {
      onRenameChat(chatId, newTitle.trim());
    }
    setEditingId(null);
    setNewTitle('');
  };

  const handleDownloadChat = async (chat: ChatSession) => {
    try {
      await downloadChatAsMd(chat);
      toast.success('Conversa exportada com sucesso!');
    } catch (error) {
      toast.error('Erro ao exportar a conversa');
      console.error('Export error:', error);
    }
  };

  const handleDelete = (chatId: string) => {
    if (window.confirm('Tem certeza que deseja excluir esta conversa?')) {
      onDeleteChat(chatId);
    }
  };

  if (!Array.isArray(chats)) {
    return <div className="p-4 text-gray-500">Nenhuma conversa disponível</div>;
  }

  return (
    <div className="chat-list-container space-y-1 p-2">
      {chats.map((chat) => (
        <div
          key={chat.id}
          className={`
            group flex items-center gap-2 p-2 rounded-lg
            ${currentChatId === chat.id ? 'bg-gray-700/50' : 'hover:bg-gray-700/30'}
            transition-colors
          `}
        >
          <button
            onClick={() => onSelectChat(chat.id)}
            className="flex-1 flex items-center gap-2 min-w-0"
          >
            <MessageSquare className="w-4 h-4 text-gray-500 flex-shrink-0" />
            {editingId === chat.id ? (
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                onBlur={() => handleSaveRename(chat.id)}
                onKeyDown={(e) => e.key === 'Enter' && handleSaveRename(chat.id)}
                className="flex-1 bg-transparent border-none focus:outline-none"
                autoFocus
              />
            ) : (
              <span className={`${themes[theme].text} text-sm truncate`}>
                {chat.title}
              </span>
            )}
          </button>
          
          <div className="ml-auto flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            {editingId === chat.id ? (
              <button
                onClick={() => handleSaveRename(chat.id)}
                className="p-1 hover:text-emerald-500 transition-colors"
              >
                Salvar
              </button>
            ) : (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDownloadChat(chat);
                  }}
                  className="p-1 hover:text-emerald-500 transition-colors"
                  title="Baixar conversa"
                >
                  <Download className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleRename(chat.id)}
                  className="p-1 hover:text-emerald-500 transition-colors"
                  title="Renomear conversa"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(chat.id)}
                  className="p-1 hover:text-red-500 transition-colors"
                  title="Excluir conversa"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};