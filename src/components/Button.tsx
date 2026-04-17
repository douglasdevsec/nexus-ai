import React from 'react';
import '../App.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'primary' | 'danger';
}

export const Button: React.FC<ButtonProps> = ({ children, variant = 'default', className = '', ...props }) => {
  const btnClass = variant === 'default' ? 'btn' : `btn btn-${variant}`;
  return (
    <button className={`${btnClass} ${className}`} {...props}>
      {children}
    </button>
  );
};
