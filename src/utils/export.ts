import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import MarkdownIt from 'markdown-it';
import { ChatSession } from '../types';

const md = new MarkdownIt();

export const exportChatToMd = (session: ChatSession): string => {
  const header = `# ${session.title}\n\nHash: ${session.hash}\nData: ${new Date(session.lastUpdated).toLocaleString()}\n\n---\n\n`;
  
  const messages = session.messages.map(msg => {
    const role = msg.role === 'assistant' ? 'Assistente' : 'Você';
    const time = new Date(msg.timestamp).toLocaleString();
    return `### ${role} (${time})\n\n${msg.content}\n\n---\n`;
  }).join('\n');

  return header + messages;
};

export const downloadChatAsMd = (session: ChatSession) => {
  const formatMessage = (msg: any) => {
    const time = new Date(msg.timestamp).toLocaleString('pt-BR');
    const role = msg.role === 'assistant' ? 'Assistente' : 'Você';
    return `### ${role} (${time})\n\n${msg.content}\n\n---\n\n`;
  };

  const content = `# ${session.title}\n\n` +
    `Data: ${new Date(session.lastUpdated).toLocaleString('pt-BR')}\n\n` +
    `ID: ${session.id}\n\n` +
    `---\n\n` +
    session.messages.map(formatMessage).join('\n');

  const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
  const fileName = `${session.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_${
    new Date().toISOString().split('T')[0]
  }.md`;
  
  saveAs(blob, fileName);
};

export const downloadAllChatsAsZip = async (sessions: ChatSession[]) => {
  const zip = new JSZip();

  sessions.forEach(session => {
    const content = exportChatToMd(session);
    zip.file(`${session.title.replace(/[^a-z0-9]/gi, '_')}_${session.hash}.md`, content);
  });

  const blob = await zip.generateAsync({ type: 'blob' });
  saveAs(blob, `replika_chats_${Date.now()}.zip`);
};