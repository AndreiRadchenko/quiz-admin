import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { type AlertConfirmationDialogType } from '../../../dictionaries/dictionaries';
import { useUnmount } from '@/hooks/useUnmount';

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  confirmationAction: () => void;
  confirmationDialog: AlertConfirmationDialogType;
};

export function AlertConfirmation({
  open,
  setOpen,
  confirmationAction,
  confirmationDialog,
}: Props) {
  const buttons = confirmationDialog?.buttons;
  useUnmount(() => {
    setTimeout(() => (document.body.style.pointerEvents = ''), 0);
  });
  return (
    <AlertDialog
      open={open}
      onOpenChange={open => {
        setOpen(open);
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{confirmationDialog?.title}</AlertDialogTitle>
          <AlertDialogDescription>
            {confirmationDialog?.message}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{buttons?.cancel.buttonText}</AlertDialogCancel>
          <AlertDialogAction onClick={confirmationAction}>
            {buttons?.continue.buttonText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
