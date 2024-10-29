import { Brain } from 'lucide-react';

interface FooterProps {
  theme: 'light' | 'dark';
}

export const Footer = ({ theme }: FooterProps) => {
  return (
    <footer className={`
      fixed 
      bottom-0 
      left-0 
      right-0 
      border-t 
      border-gray-800
      py-4
      text-sm 
      z-40
      backdrop-blur-md 
      bg-gray-900/90
    `}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="gradient-primary p-1.5 rounded">
              <Brain className="h-4 w-4 text-white" />
            </div>
            <p className="text-gray-400">
              Replika AI Solutions · Maringá, Paraná · <span className="text-gray-500">v0.0.1-beta.RC1</span>
            </p>
          </div>

          <nav className="flex items-center gap-6">
            <a href="#" className="text-gray-400 hover:text-gray-200 transition-colors">
              Termos
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-200 transition-colors">
              Privacidade
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-200 transition-colors">
              Contato
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
};