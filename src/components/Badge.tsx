import React from 'react';

interface BadgeProps {
  severity: 'critical' | 'high' | 'medium' | 'low' | 'info';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ severity, className = '' }) => {
  return (
    <span className={`badge badge-${severity} ${className}`}>
      {severity}
    </span>
  );
};
