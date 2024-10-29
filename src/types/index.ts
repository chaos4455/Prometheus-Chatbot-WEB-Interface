export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: number;
  processingTime?: number;
  error?: boolean;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  lastUpdated: number;
  hash: string;
}

export interface Theme {
  primary: string;
  secondary: string;
  background: string;
  text: string;
  accent: string;
}

export interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isProcessing: boolean;
  theme: 'light' | 'dark';
}