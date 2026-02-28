import React, { JSX } from 'react';
import { cn } from '../lib/util';

type AlertVariant = 'info' | 'success' | 'warning' | 'error';

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant;
  title?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  onClose?: () => void;
}

const variantStyles: Record<AlertVariant, { container: string; icon: string; title: string }> = {
  info: {
    container: 'bg-blue-50 border-blue-200 dark:bg-blue-950/30 dark:border-blue-800',
    icon: 'text-blue-600 dark:text-blue-400',
    title: 'text-blue-800 dark:text-blue-300',
  },
  success: {
    container: 'bg-green-50 border-green-200 dark:bg-green-950/30 dark:border-green-800',
    icon: 'text-green-600 dark:text-green-400',
    title: 'text-green-800 dark:text-green-300',
  },
  warning: {
    container: 'bg-yellow-50 border-yellow-200 dark:bg-yellow-950/30 dark:border-yellow-800',
    icon: 'text-yellow-600 dark:text-yellow-400',
    title: 'text-yellow-800 dark:text-yellow-300',
  },
  error: {
    container: 'bg-red-50 border-red-200 dark:bg-red-950/30 dark:border-red-800',
    icon: 'text-red-600 dark:text-red-400',
    title: 'text-red-800 dark:text-red-300',
  },
};

const defaultIcons: Record<AlertVariant, JSX.Element> = {
  info: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
    </svg>
  ),
  success: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
  ),
  warning: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
    </svg>
  ),
  error: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
    </svg>
  ),
};

// AlertDescription component
export interface AlertDescriptionProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const AlertDescription: React.FC<AlertDescriptionProps> = ({ 
  children, 
  className, 
  ...props 
}) => {
  return (
    <div className={cn('text-sm', className)} {...props}>
      {children}
    </div>
  );
};

AlertDescription.displayName = 'AlertDescription';

// AlertTitle component (optional but nice to have)
export interface AlertTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

const AlertTitle: React.FC<AlertTitleProps> = ({ 
  children, 
  className, 
  ...props 
}) => {
  return (
    <h5 className={cn('font-medium mb-1', className)} {...props}>
      {children}
    </h5>
  );
};

AlertTitle.displayName = 'AlertTitle';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = 'info', title, children, icon, onClose, ...props }, ref) => {
    const styles = variantStyles[variant];

    return (
      <div
        ref={ref}
        className={cn(
          'relative rounded-lg border p-4',
          styles.container,
          className
        )}
        role="alert"
        {...props}
      >
        <div className="flex gap-3">
          {icon !== undefined ? (
            <div className={cn('flex-shrink-0', styles.icon)}>{icon}</div>
          ) : (
            <div className={cn('flex-shrink-0', styles.icon)}>{defaultIcons[variant]}</div>
          )}
          
          <div className="flex-1">
            {title && (
              <h5 className={cn('font-medium mb-1', styles.title)}>{title}</h5>
            )}
            <div className={cn(
              'text-sm',
              variant === 'info' && 'text-blue-700 dark:text-blue-300/90',
              variant === 'success' && 'text-green-700 dark:text-green-300/90',
              variant === 'warning' && 'text-yellow-700 dark:text-yellow-300/90',
              variant === 'error' && 'text-red-700 dark:text-red-300/90',
            )}>
              {children}
            </div>
          </div>

          {onClose && (
            <button
              onClick={onClose}
              className={cn(
                'flex-shrink-0 ml-auto -mx-1 -my-1 p-1 rounded-lg',
                'hover:bg-black/5 dark:hover:bg-white/10',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring'
              )}
              aria-label="Close"
            >
              <svg className="w-4 h-4 text-current opacity-50 hover:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>
    );
  }
);

Alert.displayName = 'Alert';

// Alert with solid background variant
const SolidAlert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = 'info', title, children, icon, onClose, ...props }, ref) => {
    const variantSolidStyles: Record<AlertVariant, string> = {
      info: 'bg-blue-600 text-white',
      success: 'bg-green-600 text-white',
      warning: 'bg-yellow-600 text-white',
      error: 'bg-red-600 text-white',
    };

    const iconSolidStyles: Record<AlertVariant, string> = {
      info: 'text-white',
      success: 'text-white',
      warning: 'text-white',
      error: 'text-white',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'relative rounded-lg border-0 p-4',
          variantSolidStyles[variant],
          className
        )}
        role="alert"
        {...props}
      >
        <div className="flex gap-3">
          {icon !== undefined ? (
            <div className={cn('flex-shrink-0', iconSolidStyles[variant])}>{icon}</div>
          ) : (
            <div className={cn('flex-shrink-0', iconSolidStyles[variant])}>{defaultIcons[variant]}</div>
          )}
          
          <div className="flex-1">
            {title && (
              <h5 className="font-medium mb-1 text-white">{title}</h5>
            )}
            <div className="text-sm text-white/90">
              {children}
            </div>
          </div>

          {onClose && (
            <button
              onClick={onClose}
              className="flex-shrink-0 ml-auto -mx-1 -my-1 p-1 rounded-lg hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label="Close"
            >
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>
    );
  }
);

SolidAlert.displayName = 'SolidAlert';

export { Alert, SolidAlert, AlertDescription, AlertTitle };