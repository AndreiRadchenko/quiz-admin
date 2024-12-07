'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

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
  alertConfirmationMessage,
}: {
  children: React.ReactNode;
  title?: string;
  description?: string;
  alertConfirmationMessage?: string;
}) {
  const [showExitConfirmation, setShowExitConfirmation] = useState(false);
  const router = useRouter();

  const closeModal = () => {
    router.back();
  };

  const handleOpenChange = () => {
    const isFormModified = sessionStorage.getItem('formModified');
    if (isFormModified && JSON.parse(isFormModified)) {
      setShowExitConfirmation(true);
    } else {
      router.back();
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
              message={alertConfirmationMessage ?? ''}
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
