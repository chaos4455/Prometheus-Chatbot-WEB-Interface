import { MessageSquare, Plus, Trash2, Download } from 'lucide-react';
import { themes } from '../config/themes';
import { ChatList } from './ChatList';
import { ChatSession } from '../types';
import { toast } from 'sonner';

interface SidebarProps {
  theme: 'light' | 'dark';
  isOpen: boolean;
  sessions: ChatSession[];
  currentSessionId: string | null;
  onSelectSession: (sessionId: string) => void;
  onNewChat: () => void;
  onDeleteChat: (sessionId: string) => void;
  onRenameChat: (sessionId: string, newTitle: string) => void;
}

export const Sidebar = ({ 
  theme, 
  isOpen, 
  sessions = [],
  currentSessionId,
  onSelectSession,
  onNewChat,
  onDeleteChat,
  onRenameChat
}: SidebarProps) => {
  return (
    <aside className={`
      ${themes[theme].secondary} 
      fixed left-0 top-0 bottom-[72px] w-64
      transform transition-transform duration-300 ease-in-out z-40
      ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      border-r border-gray-200 dark:border-gray-700
      flex flex-col
      md:translate-x-0 
      ${!isOpen && 'md:hidden'}
    `}>
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <button 
          onClick={onNewChat}
          className="w-full flex items-center gap-2 px-4 py-3 rounded-lg gradient-primary text-white hover:opacity-90 transition-opacity"
        >
          <Plus className="w-5 h-5" />
          <span>Nova Conversa</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-thin">
        <ChatList
          chats={sessions}
          currentChatId={currentSessionId}
          onSelectChat={onSelectSession}
          onDeleteChat={onDeleteChat}
          onRenameChat={onRenameChat}
          theme={theme}
        />
      </div>
    </aside>
  );
};