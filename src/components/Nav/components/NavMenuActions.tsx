import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { useTransition, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { usePreferencesContext } from '@/context/preferences-provider';

export function ThemeToggleDropdownItem() {
  const { userPreferences, setUserPreferences } = usePreferencesContext();

  // const [isPending, startTransition] = useTransition();
  // const router = useRouter();

  return (
    <DropdownMenuItem
      // disabled={isPending}
      onClick={() => {
        // startTransition(async () => {
        //   await toggleProductAvailability(id, !isAvailableForPurchase);
        //   router.refresh();
        // });
        setUserPreferences(prevState => ({ ...prevState, mode: prevState.mode === 'dark' ? 'light' : 'dark' }))
        console.log(userPreferences);
      }}
    >
      {userPreferences.mode === 'dark' ? 'Light Theme' : 'Dark Theme'}
    </DropdownMenuItem>
  );
}

export function DeleteDropdownItem({
  id,
  disabled,
}: {
  id: string;
  disabled: boolean;
}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  return (
    <DropdownMenuItem
      // variant="destructive"
      disabled={disabled || isPending}
      onClick={() => {
        // startTransition(async () => {
        //   await deleteProduct(id);
        //   router.refresh();
        // });
      }}
    >
      Delete
    </DropdownMenuItem>
  );
}
