import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';

import { IoMdMore } from "react-icons/io";
import { ThemeToggleDropdownItem } from './NavMenuActions';

export default function NavMenu() {

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
      <ThemeToggleDropdownItem
      // id={product.id}
      // isAvailableForPurchase={product.isAvailableForPurchase}
      />

    </DropdownMenuContent>
  </DropdownMenu>

}