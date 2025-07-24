const Button = ({ 
  children, 
  type = 'button', 
  disabled = false, 
  className = '', 
  onClick,
  variant = 'primary',
  ...props 
}) => {
  const baseClasses = 'px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center';
  
  const variantClasses = {
    primary: 'bg-green-600 text-white hover:bg-green-700 focus:ring-2 focus:ring-green-500',
    secondary: 'bg-white text-green-700 border border-green-600 hover:bg-green-50',
    danger: 'bg-red-600 text-white hover:bg-red-700',
    outline: 'bg-transparent text-green-700 border border-green-600 hover:bg-green-50',
    disabled: 'bg-gray-300 text-gray-500 cursor-not-allowed'
  };

  return (
    <button
      type={type}
      disabled={disabled}
      className={`${baseClasses} ${disabled ? variantClasses.disabled : variantClasses[variant]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;