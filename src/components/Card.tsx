import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = '', hover = true }) => {
  return (
    <div className={`bg-white rounded-2xl p-8 border border-gray-100 shadow-soft ${hover ? 'transition-all duration-300 hover:shadow-xl hover:-translate-y-1' : ''} ${className}`}>
      {children}
    </div>
  );
};
