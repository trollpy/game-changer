const Button = ({ 
  children, 
  type = 'button', 
  disabled = false, 
  className = '', 
  onClick,
  ...props 
}) => {
  const baseClasses = 'px-4 py-2 rounded-lg font-medium transition-colors duration-200';
  const colorClasses = disabled 
    ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
    : 'bg-green-600 text-white hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50';
  
  return (
    <button
      type={type}
      disabled={disabled}
      className={`${baseClasses} ${colorClasses} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;