import { useState, useEffect } from 'react';
import { Wifi, WifiOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

export const ApiStatus = () => {
  const [isOnline, setIsOnline] = useState(true);
  const [isChecking, setIsChecking] = useState(false);

  useEffect(() => {
    const checkStatus = async () => {
      setIsChecking(true);
      try {
        const response = await fetch('http://localhost:8000/status');
        const newStatus = response.ok;
        
        if (isOnline !== newStatus) {
          if (newStatus) {
            toast.success('API está online novamente!');
          } else {
            toast.error('API está offline!');
          }
          setIsOnline(newStatus);
        }
      } catch {
        if (isOnline) {
          toast.error('API está offline!');
          setIsOnline(false);
        }
      }
      setIsChecking(false);
    };

    checkStatus();
    const interval = setInterval(checkStatus, 30000);
    return () => clearInterval(interval);
  }, [isOnline]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={isOnline ? 'online' : 'offline'}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${
          isOnline ? 'bg-emerald-500/20 text-emerald-500' : 'bg-red-500/20 text-red-500'
        }`}
      >
        <motion.div
          animate={{ rotate: isChecking ? 360 : 0 }}
          transition={{ duration: 1, repeat: isChecking ? Infinity : 0 }}
        >
          {isOnline ? <Wifi className="w-4 h-4" /> : <WifiOff className="w-4 h-4" />}
        </motion.div>
        <span className="text-sm font-medium">
          {isOnline ? 'API Online' : 'API Offline'}
        </span>
      </motion.div>
    </AnimatePresence>
  );
};