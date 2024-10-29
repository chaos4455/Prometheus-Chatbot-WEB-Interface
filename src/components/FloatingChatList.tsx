import { List, Plus, Trash2, Download, Edit2, Check, X } from 'lucide-react';
import { ChatSession } from '../types';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { downloadChatAsMd } from '../utils/export';
import { toast } from 'sonner';

interface FloatingChatListProps {
  sessions: ChatSession[];
  currentSessionId: string | null;
  onSelectSession: (sessionId: string) => void;
  onDeleteChat: (sessionId: string) => void;
  onRenameChat: (sessionId: string, newTitle: string) => void;
  onNewChat: () => void;
  theme: 'light' | 'dark';
}

export const FloatingChatList = ({
  sessions,
  currentSessionId,
  onSelectSession,
  onDeleteChat,
  onRenameChat,
  onNewChat,
  theme
}: FloatingChatListProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState('');

  const handleRename = (chatId: string) => {
    const chat = sessions.find(c => c.id === chatId);
    if (chat) {
      setNewTitle(chat.title || '');
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

  const handleDelete = (chatId: string) => {
    if (window.confirm('Tem certeza que deseja excluir esta conversa?')) {
      onDeleteChat(chatId);
      toast.success('Conversa excluída com sucesso!');
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="floating-action-button left"
      >
        <List className="w-6 h-6" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setIsOpen(false)}
            />
            
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 20 }}
              className="fixed left-0 top-0 bottom-0 w-80 bg-gray-900 border-r border-gray-700 z-50 flex flex-col"
            >
              <div className="p-4 border-b border-gray-700">
                <button
                  onClick={() => {
                    onNewChat();
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-600 text-white hover:opacity-90 transition-opacity"
                >
                  <Plus className="w-5 h-5" />
                  <span>Nova Conversa</span>
                </button>
              </div>

              <div className="flex-1 overflow-y-auto">
                <div className="space-y-1 p-2">
                  {sessions.map((chat) => (
                    <motion.div
                      key={chat.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`
                        group relative rounded-lg transition-colors
                        ${currentSessionId === chat.id ? 'bg-gray-700/50' : 'hover:bg-gray-700/30'}
                      `}
                    >
                      {editingId === chat.id ? (
                        <div className="flex items-center p-2 gap-2">
                          <input
                            type="text"
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                            className="flex-1 bg-gray-800 text-gray-100 px-2 py-1 rounded border border-gray-600 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none"
                            autoFocus
                          />
                          <button
                            onClick={() => handleSaveRename(chat.id)}
                            className="p-1 hover:text-emerald-400"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setEditingId(null)}
                            className="p-1 hover:text-red-400"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <div 
                          onClick={() => {
                            onSelectSession(chat.id);
                            setIsOpen(false);
                          }}
                          className="flex items-center p-3 cursor-pointer"
                        >
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <List className="w-4 h-4 text-gray-400 flex-shrink-0" />
                              <span className="text-sm font-medium text-gray-200 truncate">
                                {chat.title || 'Nova Conversa'}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRename(chat.id);
                              }}
                              className="p-1 hover:text-emerald-400 rounded"
                              title="Renomear"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDelete(chat.id);
                              }}
                              className="p-1 hover:text-red-400 rounded"
                              title="Excluir"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ))}

                  {sessions.length === 0 && (
                    <div className="text-center py-8 text-gray-400">
                      <p>Nenhuma conversa iniciada</p>
                      <p className="text-sm mt-2">Clique em "Nova Conversa" para começar</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}; 