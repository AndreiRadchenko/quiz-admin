'use client';

import Image from 'next/image';
import {
  Home,
  ChevronLeft,
  Users,
  Files,
  FileQuestion,
  ListOrdered,
  Images,
  Baby,
  Shapes,
} from 'lucide-react';
import { MdPortrait } from 'react-icons/md';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  useSidebar,
  SidebarRail,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import { usePathname } from 'next/navigation';
import logo from '../../../public/1percentclub.png';

import { type MenuType } from '../../../dictionaries/dictionaries';
import { type Locale } from '../../../i18n-config';
import Link from 'next/link';
import NavMenu from './components/NavMenu';
import { cn } from '@/lib/utils';

type Props = {
  nav: { [key: string]: string };
  navGroupName: { [key: string]: string };
  navTooltip: { [key: string]: string };
  menu: MenuType;
  lang: Locale;
};

export function AppSidebar({
  nav,
  navGroupName,
  navTooltip,
  menu,
  lang,
}: Props) {
  const pathName = usePathname();
  const { toggleSidebar } = useSidebar();

  // Menu items.
  const gamePreferences = [
    {
      title: nav.dashboard,
      url: '/quiz',
      icon: Home,
      tooltip: navTooltip.dashboard,
    },
    {
      title: nav.players,
      url: '/quiz/players',
      icon: Users,
      tooltip: navTooltip.players,
    },
    {
      title: nav.questions,
      url: '/quiz/questions',
      icon: Files,
      tooltip: navTooltip.questions,
    },
    {
      title: nav.questionDefinitions,
      url: '/quiz/question-definitions',
      icon: FileQuestion,
      tooltip: navTooltip.questionDefinitions,
    },
    {
      title: nav.answers,
      url: '/quiz/answers',
      icon: ListOrdered,
      tooltip: navTooltip.answers,
    },
  ];

  const turnSummary = [
    {
      title: nav.overview,
      url: '/overview',
      icon: Shapes,
      tooltip: navTooltip.overview,
    },
  ];

  const imageStore = [
    {
      title: nav.questionImages,
      url: '',
      icon: Images,
      tooltip: navTooltip.questionImages,
    },
    {
      title: nav.playerImages,
      url: '',
      icon: MdPortrait,
      tooltip: navTooltip.playerImages,
    },
  ];

  return (
    <Sidebar variant="sidebar" collapsible="icon">
      <SidebarHeader className="bg-secondary flex flex-row justify-between items-center gap-0">
        <Image
          className={'py-0 cursor-pointer'}
          src={logo}
          alt={'logo'}
          width={40}
          height={20}
          priority
          onClick={toggleSidebar}
        />
        <ChevronLeft
          color="white"
          onClick={toggleSidebar}
          className="cursor-pointer"
        />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{navGroupName.gamePreferences}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {gamePreferences.map((item, idx) => (
                <SidebarMenuItem key={idx}>
                  <SidebarMenuButton
                    asChild
                    size={'lg'}
                    tooltip={item.tooltip}
                    className={cn(
                      '[&>svg]:size-7 pl-0',
                      pathName === '/' + lang + item.url
                        ? `hover:bg-primary-active bg-primary-active text-primary-foreground
                          hover:text-primary-foreground`
                        : ''
                    )}
                  >
                    <Link href={'/' + lang + item.url} className="w-8">
                      <item.icon size={34} className="pl-1" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarSeparator />
        <SidebarGroup>
          <SidebarGroupLabel>{navGroupName.imageStore}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {imageStore.map((item, idx) => (
                <SidebarMenuItem key={idx}>
                  <SidebarMenuButton
                    asChild
                    size={'lg'}
                    tooltip={item.tooltip}
                    className={cn(
                      '[&>svg]:size-7',
                      pathName === '/' + lang + item.url
                        ? `hover:bg-primary-active bg-primary-active text-primary-foreground
                          hover:text-primary-foreground`
                        : ''
                    )}
                  >
                    <Link href={item.url} className="w-8">
                      <item.icon size={32} className="pl-1" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarSeparator />
        <SidebarGroup>
          <SidebarGroupLabel>{navGroupName.turnSummary}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {turnSummary.map((item, idx) => (
                <SidebarMenuItem key={idx}>
                  <SidebarMenuButton
                    asChild
                    size={'lg'}
                    tooltip={item.tooltip}
                    className={cn(
                      '[&>svg]:size-7',
                      pathName === '/' + lang + item.url
                        ? `hover:bg-primary-active bg-primary-active text-primary-foreground
                          hover:text-primary-foreground`
                        : ''
                    )}
                  >
                    <Link
                      href={'/' + lang + item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8"
                    >
                      <item.icon size={32} className="pl-1" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <NavMenu
              menu={menu}
              nav={nav}
              navTooltip={navTooltip}
              className="pt-1 flex-grow text-right"
            />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
