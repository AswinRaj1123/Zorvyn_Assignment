import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/*
Show content in a focused popup above the page.
Uses isOpen flag, onClose callback, title text, and children content.
Renders animated modal with overlay when open; renders nothing when closed.
*/
const Modal = ({ isOpen, onClose, title, children }) => {
  // Do not render anything when modal is closed.
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {/* Dark overlay behind the modal to keep user focus on the popup. */}
      <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl w-full max-w-md overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 px-6 py-5">
            <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-2xl transition-colors"
            >
              <X size={22} />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {children}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default Modal;