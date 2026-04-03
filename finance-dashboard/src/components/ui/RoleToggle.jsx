import { motion } from 'framer-motion';

const RoleToggle = ({ currentRole, setRole, darkMode }) => {
  const rolePillStyle = {
    backgroundColor: darkMode ? '#1a2f54' : '#f3f4f6',
    boxShadow: darkMode
      ? '0 6px 14px rgba(0, 0, 0, 0.35), inset 0 1px 1px rgba(255, 255, 255, 0.06)'
      : '0 3px 10px rgba(17, 24, 39, 0.16), inset 0 1px 2px rgba(255, 255, 255, 0.9)',
  };

  const getRoleLabelClass = (role) => {
    if (currentRole === role) {
      return darkMode ? 'text-blue-200' : 'text-blue-700';
    }
    return darkMode ? 'text-blue-100/70' : 'text-gray-600';
  };

  return (
    <div className="flex items-center gap-2">
      <span className="hidden sm:inline text-sm text-gray-500 dark:text-gray-400">Role</span>
      <div
        className={`relative w-20 sm:w-24 h-9 sm:h-10 rounded-full p-1 border shadow-inner transition-all duration-300 ${
          darkMode
            ? 'bg-[linear-gradient(160deg,#0f1b35_0%,#182b52_55%,#1f3765_100%)] border-[#1b2f56]'
            : 'bg-[linear-gradient(160deg,#f2f3f5_0%,#e9ebee_100%)] border-[#dadde3]'
        }`}
        role="group"
        aria-label="Select role"
      >
        <div className="relative z-20 grid grid-cols-2 h-full text-[10px] sm:text-[11px] font-semibold">
          <button
            type="button"
            onClick={() => setRole('admin')}
            className={`relative rounded-full transition-colors ${getRoleLabelClass('admin')}`}
            aria-pressed={currentRole === 'admin'}
          >
            {currentRole === 'admin' && (
              <motion.span
                layoutId="role-toggle-pill"
                className="absolute inset-0 rounded-full"
                style={rolePillStyle}
                transition={{ type: 'spring', stiffness: 420, damping: 34 }}
              />
            )}
            <span className="relative z-10">Admin</span>
          </button>
          <button
            type="button"
            onClick={() => setRole('viewer')}
            className={`relative rounded-full transition-colors ${getRoleLabelClass('viewer')}`}
            aria-pressed={currentRole === 'viewer'}
          >
            {currentRole === 'viewer' && (
              <motion.span
                layoutId="role-toggle-pill"
                className="absolute inset-0 rounded-full"
                style={rolePillStyle}
                transition={{ type: 'spring', stiffness: 420, damping: 34 }}
              />
            )}
            <span className="relative z-10">Viewer</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoleToggle;