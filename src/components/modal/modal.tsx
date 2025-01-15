'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { type AlertConfirmationDialogType } from '../../../dictionaries/dictionaries';

import {
  Dialog,
  DialogOverlay,
  DialogContent,
  DialogPortal,
  DialogTitle,
  DialogDescription,
} from '../ui/dialog';
import { AlertConfirmation } from './alertConfirmation';

export function Modal({
  children,
  title,
  description,
  confirmationDialog,
  backUrl,
}: {
  children: React.ReactNode;
  title?: string;
  description?: string;
  confirmationDialog: AlertConfirmationDialogType;
  backUrl?: string;
}) {
  const [showExitConfirmation, setShowExitConfirmation] = useState(false);
  const router = useRouter();

  const closeModal = () => {
    sessionStorage.setItem('formModified', 'false');
    setShowExitConfirmation(false);
    router.back();
  };

  const handleOpenChange = (open: boolean) => {
    const isFormModified = sessionStorage.getItem('formModified');
    if (isFormModified && JSON.parse(isFormModified)) {
      setShowExitConfirmation(true);
    } else {
      closeModal();
    }
  };

  return (
    <Dialog defaultOpen={true} open={true} onOpenChange={handleOpenChange}>
      <DialogPortal>
        <DialogOverlay className="bg-gray-500 bg-opacity-10">
          <DialogContent className="overflow-y-hidden xl:w-2/4 w-3/4 max-h-screen">
            <AlertConfirmation
              open={showExitConfirmation}
              setOpen={setShowExitConfirmation}
              confirmationAction={closeModal}
              confirmationDialog={confirmationDialog}
            />
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
            {children}
          </DialogContent>
        </DialogOverlay>
      </DialogPortal>
    </Dialog>
  );
}
