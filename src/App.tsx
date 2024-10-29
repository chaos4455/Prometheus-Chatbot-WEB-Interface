import { useChat } from './hooks/useChat';
import { ChatInput } from './components/ChatInput';
import { ChatMessage } from './components/ChatMessage';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { EmptyState } from './components/EmptyState';
import { useState } from 'react';
import { useChatStore } from './store/chat-store';
import { ComingSoonModal } from './components/ComingSoonModal';
import { FloatingNewChat } from './components/FloatingNewChat';
import { FloatingChatList } from './components/FloatingChatList';
import { toast, ToastContainer } from 'react-toastify';
import { downloadAllChatsAsZip } from './utils/downloadAllChatsAsZip';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  const { messages, isProcessing, sendMessage } = useChat();
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalFeature, setModalFeature] = useState('');
  
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);

  const {
    sessions,
    addSession,
    setCurrentSession,
    deleteSession,
    renameSession,
    clearSessions
  } = useChatStore();

  const handleFeatureClick = (feature: string) => {
    setModalFeature(feature);
    setIsModalOpen(true);
  };

  const handleNewChat = () => {
    const newSessionId = addSession();
    setCurrentSession(newSessionId);
  };

  const handleExportAll = async () => {
    if (!sessions || sessions.length === 0) {
      toast.error('Nenhuma conversa para exportar!');
      return;
    }
    
    try {
      await downloadAllChatsAsZip(sessions);
      toast.success('Todas as conversas foram exportadas com sucesso!');
    } catch (error) {
      toast.error('Erro ao exportar as conversas');
      console.error('Export error:', error);
    }
  };

  const handleClearChats = () => {
    clearSessions();
    toast.success('Todas as conversas foram excluídas');
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <ToastContainer />
      <Header 
        theme={theme}
        onFeatureClick={handleFeatureClick}
        onExportAll={handleExportAll}
        onClearChats={handleClearChats}
      />

      <FloatingChatList
        sessions={sessions}
        currentSessionId={currentSessionId}
        onSelectSession={setCurrentSession}
        onDeleteChat={deleteSession}
        onRenameChat={renameSession}
        onNewChat={handleNewChat}
        theme={theme}
      />

      <main className="w-full min-h-screen pt-16 pb-32">
        <div className="chat-container">
          <div className="space-y-6 px-4">
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                message={message}
                theme={theme}
              />
            ))}
            
            {messages.length === 0 && (
              <EmptyState />
            )}
          </div>
        </div>

        <ChatInput
          onSendMessage={sendMessage}
          isProcessing={isProcessing}
          theme={theme}
          onFeatureClick={handleFeatureClick}
        />

        <FloatingNewChat onClick={handleNewChat} />
      </main>

      <Footer theme={theme} />

      <ComingSoonModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        feature={modalFeature}
      />
    </div>
  );
}