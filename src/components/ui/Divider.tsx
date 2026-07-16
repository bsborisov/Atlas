import { cn } from '@/lib/utils';
import React from 'react';

interface DividerProps {
  vertical?: boolean;
  className?: string;
}

const Divider: React.FC<DividerProps> = ({ vertical, className = "" }) => {
  return (
    <div
      className={cn(`bg-neutral-800 ${vertical
        ? 'w-px min-w-px'
        : 'h-px min-h-px'
        } ${className}`)}
    />
  );
};

export default Divider;