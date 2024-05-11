import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';

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
