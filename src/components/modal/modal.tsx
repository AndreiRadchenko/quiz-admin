'use client';

import { Dialog, DialogOverlay, DialogContent } from '../ui/dialog';
import { useRouter } from 'next/navigation';

export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const handleOpenChange = () => {
    router.back();
  };

  return (
    <Dialog defaultOpen={true} open={true} onOpenChange={handleOpenChange}>
      <DialogOverlay className="bg-gray-500 bg-opacity-10">
        <DialogContent className="overflow-y-hidden">{children}</DialogContent>
      </DialogOverlay>
    </Dialog>
  );
}

// import { Dialog, DialogOverlay, DialogContent } from '@/components/ui/dialog';
// import { AlertConfirmation } from './alertConfirmation';
// import { useRouter } from 'next/navigation';
// import { useState } from 'react';

// export function Modal({ children }: { children: React.ReactNode }) {
//   const [showExitConfirmation, setShowExitConfirmation] = useState(false);
//   const router = useRouter();

//   const closeModal = () => {
//     router.back();
//   };

//   const handleOpenChange = () => {
//     const isUserFormModified = localStorage.getItem('userFormModified');
//     if (isUserFormModified && JSON.parse(isUserFormModified)) {
//       setShowExitConfirmation(true);
//     } else {
//       router.back();
//     }
//   };

//   return (
//     <Dialog defaultOpen={true} open={true} onOpenChange={handleOpenChange}>
//       <DialogOverlay>
//         <DialogContent className="overflow-y-hidden">
//           <AlertConfirmation
//             open={showExitConfirmation}
//             setOpen={setShowExitConfirmation}
//             confirmationAction={closeModal}
//             message="You haven't saved your changes. Please confirm you want to exit without saving."
//           />
//           {children}
//         </DialogContent>
//       </DialogOverlay>
//     </Dialog>
//   );
// }
