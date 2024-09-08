import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { usePreferencesContext } from '@/context/preferences-provider';

export function ThemeToggleDropdownItem({ menu }: any) {
  const { userPreferences, setUserPreferences } = usePreferencesContext();

  return (
    <DropdownMenuItem
      onClick={() => {
        setUserPreferences(prevState => ({
          ...prevState,
          mode: prevState.mode === 'dark' ? 'light' : 'dark',
        }));
      }}
    >
      {userPreferences.mode === 'dark' ? menu.lightTheme : menu.darkTheme}
    </DropdownMenuItem>
  );
}
