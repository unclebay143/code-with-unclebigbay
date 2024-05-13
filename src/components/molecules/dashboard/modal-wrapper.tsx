import React from 'react';
import { Drawer } from 'vaul';
import * as Dialog from '@radix-ui/react-dialog';
import useMediaQuery from '@/components/hooks/useMediaQuery';

type Props = {
  open: boolean;
  onOpenChange: () => void;
  children: React.ReactNode;
  maxWidth?: number;
};

export const ModalWrapper = ({
  open,
  onOpenChange,
  children,
  maxWidth = 450,
}: Props) => {
  const { isMobile } = useMediaQuery();

  if (isMobile) {
    return (
      <Drawer.Root
        open={open}
        onOpenChange={(open) => {
          if (!open) onOpenChange();
        }}
      >
        <Drawer.Overlay className="fixed inset-0 z-40 bg-gray-100 bg-opacity-10 backdrop-blur" />
        <Drawer.Portal>
          <Drawer.Content
            className={
              'fixed bottom-0 left-0 right-0 z-50 mt-24 p-5 rounded-t-[10px] border-t border-gray-200 bg-white'
            }
          >
            <div className="sticky top-0 z-20 flex w-full items-center justify-center rounded-t-[10px] bg-inherit">
              <div className="my-3 h-1 w-12 rounded-full bg-gray-300" />
            </div>
            {children}
          </Drawer.Content>
          <Drawer.Overlay />
        </Drawer.Portal>
      </Drawer.Root>
    );
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed z-[9999] inset-0 animate-fade-in bg-gray-100 bg-opacity-50 backdrop-blur-md" />
        <Dialog.Content
          className={`border z-[9999] fixed bg-white dark:bg-slate-950 top-[50%] left-[50%] w-full p-5 rounded-md -translate-y-2/4 -translate-x-2/4`}
          style={{ maxWidth }}
        >
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
