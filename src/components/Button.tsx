import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center rounded-xl font-heading font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variants = {
    primary: "bg-lilac text-white hover:bg-lilac/90 shadow-lg shadow-lilac/20 focus:ring-lilac",
    secondary: "bg-white text-midnight hover:bg-gray-50 shadow-soft focus:ring-gray-200",
    outline: "bg-transparent border border-gray-200 text-midnight hover:bg-gray-50 focus:ring-gray-200"
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  const widthStyles = fullWidth ? "w-full" : "";

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthStyles} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
