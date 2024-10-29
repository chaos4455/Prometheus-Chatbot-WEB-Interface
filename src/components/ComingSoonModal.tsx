import { Modal } from './Modal';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface ComingSoonModalProps {
  isOpen: boolean;
  onClose: () => void;
  feature: string;
}

export const ComingSoonModal = ({ isOpen, onClose, feature }: ComingSoonModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Em Breve">
      <div className="flex flex-col items-center justify-center p-6 space-y-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20
          }}
          className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center"
        >
          <Sparkles className="w-8 h-8 text-white" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center space-y-3"
        >
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            {feature}
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Esta funcionalidade está em desenvolvimento e estará disponível em breve!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="w-full"
        >
          <button
            onClick={onClose}
            className="w-full px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-lg hover:from-emerald-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors"
          >
            Entendi
          </button>
        </motion.div>
      </div>
    </Modal>
  );
};