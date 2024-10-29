import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { ChatSession } from '../types/chat';

export const downloadAllChatsAsZip = async (sessions: ChatSession[]) => {
  const zip = new JSZip();
  
  sessions.forEach((session) => {
    const chatContent = JSON.stringify(session, null, 2);
    zip.file(`chat-${session.id}.json`, chatContent);
  });

  const blob = await zip.generateAsync({ type: 'blob' });
  saveAs(blob, 'todas-conversas.zip');
}; 