// 'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';

import { IoMdMore, IoMdCheckmark } from 'react-icons/io';
import { ThemeToggleDropdownItem } from './NavMenuActions';
import { usePreferencesContext } from '@/context/PreferencesProvider';
import { type MenuType } from '../../../../dictionaries/dictionaries';
import { cn } from '@/lib/utils';
import { SidebarMenuButton } from '@/components/ui/sidebar';
import { ChevronUp, Palette } from 'lucide-react';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  menu: MenuType;
  nav: { [key: string]: string };
  navTooltip: { [key: string]: string };
}

export default function NavMenu({ menu, nav, navTooltip, className }: Props) {
  const { userPreferences, setUserPreferences } = usePreferencesContext();

  return (
    <div className={cn('', className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <SidebarMenuButton
            size={'lg'}
            tooltip={navTooltip.appearance}
            className="[&>svg]:size-7"
          >
            <Palette className="pl-1" /> {nav.appearance}
            <ChevronUp className="ml-auto" />
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="absolute bottom-14 -left-2">
          <DropdownMenuItem
            onClick={() => {
              setUserPreferences(prevState => ({ ...prevState, lang: 'uk' }));
            }}
            className="flex justify-between"
          >
            {menu?.langUk}
            {userPreferences.lang === 'uk' && <IoMdCheckmark size={18} />}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setUserPreferences(prevState => ({ ...prevState, lang: 'en' }));
            }}
            className="flex justify-between"
          >
            {menu?.langEn}
            {userPreferences.lang === 'en' && <IoMdCheckmark size={18} />}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <ThemeToggleDropdownItem menu={menu} />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
