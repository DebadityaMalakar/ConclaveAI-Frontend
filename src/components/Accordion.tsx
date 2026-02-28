import React, { useState } from 'react';
import { cn } from '../lib/util';

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  disabled?: boolean;
}

interface AccordionProps {
  items: AccordionItemProps[];
  type?: 'single' | 'multiple';
  defaultOpen?: string[];
  className?: string;
  allowMultiple?: boolean; // Deprecated, use type instead
}

const Accordion: React.FC<AccordionProps> = ({
  items,
  type = 'single',
  defaultOpen = [],
  className,
  allowMultiple, // For backward compatibility
}) => {
  const [openItems, setOpenItems] = useState<string[]>(defaultOpen);
  
  // Determine if multiple can be open
  const canOpenMultiple = type === 'multiple' || allowMultiple;

  const toggleItem = (title: string) => {
    if (canOpenMultiple) {
      setOpenItems(prev =>
        prev.includes(title)
          ? prev.filter(item => item !== title)
          : [...prev, title]
      );
    } else {
      setOpenItems(prev =>
        prev.includes(title) ? [] : [title]
      );
    }
  };

  return (
    <div className={cn('divide-y divide-border rounded-lg border border-border overflow-hidden', className)}>
      {items.map((item, index) => {
        const isOpen = openItems.includes(item.title);
        
        return (
          <AccordionItem
            key={index}
            title={item.title}
            isOpen={isOpen}
            onToggle={() => toggleItem(item.title)}
            disabled={item.disabled}
          >
            {item.children}
          </AccordionItem>
        );
      })}
    </div>
  );
};

interface AccordionItemComponentProps {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  disabled?: boolean;
}

const AccordionItem: React.FC<AccordionItemComponentProps> = ({
  title,
  children,
  isOpen,
  onToggle,
  disabled = false,
}) => {
  return (
    <div className={cn(
      'bg-card',
      disabled && 'opacity-50 cursor-not-allowed'
    )}>
      <button
        onClick={onToggle}
        disabled={disabled}
        className={cn(
          'w-full flex items-center justify-between p-4 text-left transition-colors',
          'hover:bg-card-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-ring',
          disabled && 'pointer-events-none'
        )}
      >
        <span className="font-medium text-foreground">{title}</span>
        <svg
          className={cn(
            'w-5 h-5 transition-transform duration-200 text-muted-foreground',
            isOpen && 'transform rotate-180'
          )}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      <div
        className={cn(
          'overflow-hidden transition-all duration-200 ease-in-out',
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <div className="p-4 pt-0 text-muted-foreground border-t border-border">
          {children}
        </div>
      </div>
    </div>
  );
};

// Alternative controlled component approach
interface ControlledAccordionProps {
  children: React.ReactNode;
  type?: 'single' | 'multiple';
  value?: string[];
  onValueChange?: (value: string[]) => void;
  className?: string;
}

const ControlledAccordion: React.FC<ControlledAccordionProps> = ({
  children,
  type = 'single',
  value = [],
  onValueChange,
  className,
}) => {
  const canOpenMultiple = type === 'multiple';

  const toggleItem = (itemValue: string) => {
    if (!onValueChange) return;

    if (canOpenMultiple) {
      onValueChange(
        value.includes(itemValue)
          ? value.filter(v => v !== itemValue)
          : [...value, itemValue]
      );
    } else {
      onValueChange(value.includes(itemValue) ? [] : [itemValue]);
    }
  };

  return (
    <div className={cn('divide-y divide-border rounded-lg border border-border overflow-hidden', className)}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement<ControlledAccordionItemProps>(child)) {
          return React.cloneElement(child as React.ReactElement<ControlledAccordionItemProps>, {
            isOpen: value.includes(child.props.value),
            onToggle: () => toggleItem(child.props.value),
          });
        }
        return child;
      })}
    </div>
  );
};

interface ControlledAccordionItemProps {
  value: string;
  title: string;
  children: React.ReactNode;
  isOpen?: boolean;
  onToggle?: () => void;
  disabled?: boolean;
}

const ControlledAccordionItem: React.FC<ControlledAccordionItemProps> = ({
  title,
  children,
  isOpen = false,
  onToggle,
  disabled = false,
}) => {
  return (
    <div className={cn(
      'bg-card',
      disabled && 'opacity-50 cursor-not-allowed'
    )}>
      <button
        onClick={onToggle}
        disabled={disabled}
        className={cn(
          'w-full flex items-center justify-between p-4 text-left transition-colors',
          'hover:bg-card-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-ring',
          disabled && 'pointer-events-none'
        )}
      >
        <span className="font-medium text-foreground">{title}</span>
        <svg
          className={cn(
            'w-5 h-5 transition-transform duration-200 text-muted-foreground',
            isOpen && 'transform rotate-180'
          )}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      <div
        className={cn(
          'overflow-hidden transition-all duration-200 ease-in-out',
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <div className="p-4 pt-0 text-muted-foreground border-t border-border">
          {children}
        </div>
      </div>
    </div>
  );
};

export { 
  Accordion, 
  ControlledAccordion, 
  ControlledAccordionItem 
};