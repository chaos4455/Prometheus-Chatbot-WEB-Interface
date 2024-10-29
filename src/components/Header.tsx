import { Brain, HelpCircle, Settings, UserCircle, Download, Trash2 } from 'lucide-react';

interface HeaderProps {
  theme: 'light' | 'dark';
  onFeatureClick: (feature: string) => void;
  onExportAll: () => void;
  onClearChats: () => void;
}

export const Header = ({ theme, onFeatureClick, onExportAll, onClearChats }: HeaderProps) => {
  const handleClearChats = () => {
    if (window.confirm('Tem certeza que deseja excluir todas as conversas? Esta ação não pode ser desfeita.')) {
      onClearChats();
    }
  };

  return (
    <header className={`
      fixed top-0 left-0 right-0 z-50
      backdrop-blur-md bg-opacity-90
      border-b border-gray-700
      bg-gray-900
    `}>
      <div className="flex items-center justify-between max-w-8xl mx-auto px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="gradient-primary p-2 rounded-lg">
            <Brain className="h-6 w-6 text-white" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-bold gradient-text hidden md:block">
              Replika AI Solutions
            </h1>
            <span className="text-xs text-gray-400 hidden md:block">
              Chatbot & Copilot Platform BETA RC1
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={onExportAll}
            className="p-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2"
            title="Baixar todas as conversas"
          >
            <Download className="w-5 h-5" />
            <span className="hidden md:inline text-sm">Exportar Tudo</span>
          </button>

          <button 
            onClick={handleClearChats}
            className="p-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2 text-red-500"
            title="Limpar todas as conversas"
          >
            <Trash2 className="w-5 h-5" />
            <span className="hidden md:inline text-sm">Limpar Tudo</span>
          </button>

          <button 
            onClick={() => onFeatureClick('Ajuda')}
            className="p-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <HelpCircle className="w-5 h-5" />
          </button>
          <button 
            onClick={() => onFeatureClick('Configurações')}
            className="p-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <Settings className="w-5 h-5" />
          </button>
          <button 
            onClick={() => onFeatureClick('Perfil')}
            className="p-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <UserCircle className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};