import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { usePreferencesContext } from '@/context/preferences-provider';

export function ThemeToggleDropdownItem() {
  const { userPreferences, setUserPreferences } = usePreferencesContext();

  return (
    <DropdownMenuItem
      onClick={() => {
        setUserPreferences(prevState => ({ ...prevState, mode: prevState.mode === 'dark' ? 'light' : 'dark' }))
      }}
    >
      {userPreferences.mode === 'dark' ? 'Light Theme' : 'Dark Theme'}
    </DropdownMenuItem>
  );
}

