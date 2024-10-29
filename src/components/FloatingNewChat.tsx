import { Plus } from 'lucide-react';

interface FloatingNewChatProps {
  onClick: () => void;
}

export const FloatingNewChat = ({ onClick }: FloatingNewChatProps) => {
  return (
    <button
      onClick={onClick}
      className="floating-action-button right"
    >
      <Plus className="w-6 h-6" />
    </button>
  );
}; 