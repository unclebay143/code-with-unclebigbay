import React, { createContext } from 'react';
import * as SheetPrimitive from '@radix-ui/react-dialog';
import { cva } from 'class-variance-authority';
import { IconButton, X } from '@hashnode/matrix-ui';

const slideOverContent = cva(
  'z-[9999] flex flex-col w-[270px] sm:w-[460px] fixed inset-y-0 bg-white dark:bg-slate-950',
  {
    variants: {
      position: {
        left: 'left-0',
        right: 'right-0',
      },
    },
  },
);

const slideOverOverlay = cva(
  'fixed z-[9999] inset-0 opacity-50 bg-slate-900 dark:bg-slate-600',
);

const slideOverHeader = cva(
  'flex items-center justify-between pt-4 px-5 pb-3 border-b border-slate-200 dark:border-slate-800/80',
  {
    variants: {
      border: { none: ['border-b-transparent'], visible: ['border'] },
    },
  },
);

const slideOverContext = createContext({
  isOpen: false,
  closeSlideOver: () => {},
});

const useSlideOver = () => {
  const context = React.useContext(slideOverContext);
  if (context === undefined) {
    throw new Error('useSlideOver must be used within a SlideOverProvider');
  }
  return context;
};

const SlideOverProvider = ({
  children,
  isOpen,
  closeSlideOver,
}: {
  children: React.ReactNode;
  isOpen: boolean;
  closeSlideOver: () => void;
}) => {
  return (
    <slideOverContext.Provider value={{ isOpen, closeSlideOver }}>
      {children}
    </slideOverContext.Provider>
  );
};

type SlideOverProps = {
  isOpen: boolean;
  closeSlideOver: () => void;
  children?: React.ReactNode;
  asChild?: boolean;
  position?: 'left' | 'right';
};

export const SlideOverHeader = ({
  title,
  borderless,
}: {
  title?: string;
  borderless?: boolean;
}) => {
  const { closeSlideOver } = useSlideOver();
  return (
    <div
      className={slideOverHeader({
        border: borderless ? 'none' : 'visible',
        className: `${!title ? '!py-0' : ''}`,
      })}
    >
      <SheetPrimitive.Title className="font-semibold text-xl text-slate-700 dark:text-slate-200">
        {title}
      </SheetPrimitive.Title>
      <SheetPrimitive.Close asChild>
        <IconButton
          size="xs"
          onClick={closeSlideOver}
          aria-label="Close"
          Icon={X}
        />
      </SheetPrimitive.Close>
    </div>
  );
};

export const SlideOver = ({
  isOpen,
  closeSlideOver,
  children,
  asChild,
  position = 'left',
}: SlideOverProps) => (
  <SlideOverProvider isOpen={isOpen} closeSlideOver={closeSlideOver}>
    <SheetPrimitive.Root open={isOpen}>
      <SheetPrimitive.Portal>
        <SheetPrimitive.Overlay
          onClick={closeSlideOver}
          className={slideOverOverlay()}
        />
        <SheetPrimitive.Content
          asChild={asChild}
          onEscapeKeyDown={closeSlideOver}
          className={slideOverContent({ position })}
        >
          {children}
        </SheetPrimitive.Content>
      </SheetPrimitive.Portal>
    </SheetPrimitive.Root>
  </SlideOverProvider>
);
