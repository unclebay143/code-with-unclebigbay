import React from 'react';
import { ModalWrapper } from './modal-wrapper';

type Props = {
  open: boolean;
  onOpenChange: () => void;
};

export const AddAssignmentModal = ({ open, onOpenChange }: Props) => {
  return (
    <ModalWrapper open={open} onOpenChange={onOpenChange}>
      AddAssignmentModal
    </ModalWrapper>
  );
};
