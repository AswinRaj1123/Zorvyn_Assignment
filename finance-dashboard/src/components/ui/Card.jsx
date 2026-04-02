const Card = ({ children, className = "" }) => {
  return (
    <div className={`bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm ${className}`}>
      {children}
    </div>
  );
};

export default Card;