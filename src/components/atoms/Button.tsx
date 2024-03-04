import React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

const button = cva('rounded-full flex items-center text-medium', {
  variants: {
    appearance: {
      primary: [
        'bg-slate-900 hover:bg-slate-800',
        'text-white border-transparent',
        'focus:dark:bg-blue-600',
        'focus:ring focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 dark:focus:ring-offset-slate-800',
        'disabled:bg-slate-300 disabled:cursor-not-allowed disabled:dark:bg-blue-900 disabled:dark:text-slate-400',
      ],
      'link-secondary': [
        'text-slate-600 dark:text-slate-300 disabled:text-slate-300',
        'hover:text-slate-800',
      ],
      'secondary-slate': [
        'text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-950',
        'border border-slate-300 dark:border-slate-800 hover:dark:border-slate-700',
        'hover:bg-slate-50 hover:dark:bg-slate-800',
        'focus:ring focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 dark:focus:ring-offset-slate-800',
        'disabled:bg-white disabled:border-slate-200 disabled:cursor-not-allowed disabled:text-slate-300',
        'disabled:dark:bg-slate-950 disabled:dark:border-slate-800 disabled:dark:text-slate-800',
      ],
    },
    size: {
      lg: ['text-lg', 'py-3.5', 'px-7'],
      xs: ['text-xs', 'py-1.5', 'px-4'],
      sm: ['text-sm', 'py-2.5', 'px-5'],
      md: ['text-base', 'py-3', 'px-6'],
    },
    padding: {
      none: '!px-0',
    },
    width: {
      full: 'w-full items-center justify-center',
    },
  },
  defaultVariants: {
    appearance: 'primary',
    size: 'md',
  },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {
  asChild?: boolean;
  ref?: React.ForwardedRef<HTMLButtonElement>;
}

export const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
  const { size, asChild, appearance, width, padding, ...restOfProps } = props;
  const Component = asChild ? Slot : 'button';
  return (
    <Component
      className={button({ size, appearance, width, padding })}
      {...restOfProps}
    />
  );
};
