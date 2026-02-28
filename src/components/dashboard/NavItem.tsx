'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/util';

export interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  active?: boolean;
  onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ 
  icon, 
  label, 
  href, 
  active, 
  onClick 
}) => {
  const pathname = usePathname();
  const isActive = active !== undefined ? active : pathname === href;

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200',
        'group relative overflow-hidden',
        isActive 
          ? 'bg-primary/10 text-primary font-medium border-l-4 border-primary' 
          : 'text-muted-foreground hover:bg-card-hover hover:text-foreground border-l-4 border-transparent'
      )}
    >
      {/* Active indicator dot for collapsed state */}
      {isActive && (
        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-r-full" />
      )}
      
      {/* Icon with active state styling */}
      <span className={cn(
        'w-5 h-5 transition-colors',
        isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'
      )}>
        {icon}
      </span>
      
      {/* Label */}
      <span className="flex-1 text-sm font-medium">{label}</span>
      
      {/* Active indicator dot for collapsed state */}
      {isActive && (
        <span className="w-1.5 h-1.5 rounded-full bg-primary mr-1" />
      )}
    </Link>
  );
};

export default NavItem;