import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ChatSession, Message } from '../types';
import { generateHash } from '../utils/hash';

interface ChatState {
  sessions: ChatSession[];
  currentSessionId: string | null;
  isProcessing: boolean;
  addSession: () => string;
  setCurrentSession: (id: string) => void;
  addMessage: (message: Message) => void;
  deleteSession: (id: string) => void;
  renameSession: (id: string, title: string) => void;
  setProcessing: (status: boolean) => void;
  clearSessions: () => void;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
}

export const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      sessions: [],
      currentSessionId: null,
      isProcessing: false,
      isSidebarOpen: true,

      addSession: () => {
        const newSession: ChatSession = {
          id: generateHash(),
          title: `Nova Conversa #${get().sessions.length + 1}`,
          messages: [],
          lastUpdated: Date.now(),
          hash: generateHash()
        };
        
        set(state => ({
          sessions: [newSession, ...state.sessions],
          currentSessionId: newSession.id
        }));
        
        return newSession.id;
      },

      setCurrentSession: (id: string) => {
        set({ currentSessionId: id });
      },

      addMessage: (message: Message) => {
        set(state => {
          const session = state.sessions.find(s => s.id === state.currentSessionId);
          if (!session) return state;

          const updatedSession = {
            ...session,
            messages: [...session.messages, message],
            lastUpdated: Date.now(),
            title: session.messages.length === 0 ? message.content.slice(0, 30) + '...' : session.title
          };

          return {
            sessions: state.sessions.map(s => 
              s.id === state.currentSessionId ? updatedSession : s
            )
          };
        });
      },

      deleteSession: (id: string) => {
        set(state => ({
          sessions: state.sessions.filter(s => s.id !== id),
          currentSessionId: state.currentSessionId === id ? null : state.currentSessionId
        }));
      },

      renameSession: (id: string, title: string) => {
        set(state => ({
          sessions: state.sessions.map(s => 
            s.id === id ? { ...s, title } : s
          )
        }));
      },

      setProcessing: (status: boolean) => {
        set({ isProcessing: status });
      },

      clearSessions: () => set({ sessions: [], currentSessionId: null }),

      setIsSidebarOpen: (isOpen) => {
        set({ isSidebarOpen: isOpen });
      }
    }),
    {
      name: 'chat-storage'
    }
  )
);