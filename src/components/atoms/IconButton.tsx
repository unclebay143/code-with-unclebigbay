import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from '@radix-ui/react-slot';

const iconButton = cva(
  'flex items-center justify-center transition-colors duration-100 text-slate-600 dark:text-slate-300 focus:outline-none',
  {
    variants: {
      appearance: {
        primary: [
          'border border-transparent',
          'hover:bg-slate-100 dark:hover:bg-slate-800',
          'focus:outline-none focus:bg-slate-100 dark:focus:bg-slate-800',
          'disabled:text-slate-300 disabled:dark:text-slate-800 disabled:hover:bg-transparent disabled:dark:hover:bg-transparent disabled:cursor-not-allowed',
        ],
        secondary: [
          'border border-slate-200 dark:border-slate-800',
          'hover:bg-slate-50 dark:hover:bg-slate-900',
          'focus:outline-none focus:bg-slate-50 dark:focus:bg-slate-900',
        ],
      },
      shape: {
        circular: ['rounded-full'],
        square: ['rounded'],
      },
      size: {
        xl: 'p-2',
        lg: 'p-2',
        md: 'p-1.5',
        sm: 'p-1',
        xs: 'p-1',
      },
    },
    defaultVariants: {
      appearance: 'primary',
      size: 'md',
      shape: 'circular',
    },
  },
);

// Component will either take the icon prop, or children, never both.
type ConditionalButtonProps =
  | {
      asChild?: never;
      Icon?: React.FC<any>;
      iconSolid?: boolean;
    }
  | {
      asChild?: boolean;
      Icon?: never;
      iconSolid?: never;
    };

export type IconButtonProps = ConditionalButtonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof iconButton>;

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    { className, appearance, Icon, iconSolid, size, shape, asChild, ...props },
    ref,
  ) => {
    if (asChild) {
      return (
        <Slot
          className={iconButton({ appearance, size, shape, className })}
          {...props}
          ref={ref}
        />
      );
    }
    const mappedIconSize: { [key: string]: string } = {
      sm: '12',
      md: '16',
      lg: '20',
    };

    if (typeof Icon === 'undefined') {
      return null;
    }
    return (
      <button
        ref={ref}
        className={iconButton({ appearance, size, shape, className })}
        {...props}
      >
        <Icon size={mappedIconSize[size || 'md']} solid={iconSolid} />
      </button>
    );
  },
);

IconButton.displayName = 'IconButton';
