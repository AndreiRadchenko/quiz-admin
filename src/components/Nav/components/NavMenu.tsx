'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';

import { IoMdMore, IoMdCheckmark } from "react-icons/io";
import { ThemeToggleDropdownItem } from './NavMenuActions';
import { usePreferencesContext } from '@/context/preferences-provider';

export default function NavMenu() {
  const { userPreferences, setUserPreferences } = usePreferencesContext();

  return <DropdownMenu>
    <DropdownMenuTrigger>
      <IoMdMore size={24} />
      <span className="sr-only">Actions</span>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuItem asChild>
        <a download href={`/quiz`}>
          Download
        </a>
      </DropdownMenuItem>
      <DropdownMenuItem asChild>
        <Link href={`/quiz/players`}>
          Edit
        </Link>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem onClick={() => {
        setUserPreferences(prevState => ({ ...prevState, lang: 'uk' }))
      }} className='flex justify-between'
      >
        Ukrainian
        {userPreferences.lang === 'uk' && <IoMdCheckmark size={18} />}
      </DropdownMenuItem>
      <DropdownMenuItem
        onClick={() => {
          setUserPreferences(prevState => ({ ...prevState, lang: 'en' }))
        }} className='flex justify-between'
      >
        English
        {userPreferences.lang === 'en' && <IoMdCheckmark size={18} />}
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <ThemeToggleDropdownItem />
    </DropdownMenuContent>
  </DropdownMenu>

}