'use client';

import Image from 'next/image';
import {
  Home,
  ChevronLeft,
  ChevronRight,
  Users,
  Files,
  FileQuestion,
  ListOrdered,
  Images,
  Baby,
  Shapes,
  Play,
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
  SidebarMenuSub,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from '@/components/ui/collapsible';
import { usePathname, useRouter } from 'next/navigation';
import logo from '../../../public/1percentclub.png';

import { type MenuType } from '../../../dictionaries/dictionaries';
import { type Locale } from '../../../i18n-config';
import Link from 'next/link';
import NavMenu from './components/NavMenu';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { containsExactPath } from '@/utils/RegEx';

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
  const {
    toggleSidebar,
    state,
    open: isSidebarOpen,
    setOpen: setSidebarOpen,
  } = useSidebar();
  const router = useRouter();
  const [isImageStorOpen, setIsImageStorOpen] = useState(true);

  const toggleImageStor = (open: boolean) => {
    isSidebarOpen && setIsImageStorOpen(open);
  };

  const onImageStoreBtnPress = () => {
    if (!isSidebarOpen) {
      // setSidebarOpen(true);
      // setIsImageStorOpen(true);
      router.push('/' + lang + imageStore[0].url);
    }
  };

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
      title: nav.questionDefinitions,
      url: '/quiz/question-definitions',
      icon: Files,
      tooltip: navTooltip.questionDefinitions,
    },
    {
      title: nav.questions,
      url: '/quiz/questions',
      icon: Play,
      tooltip: navTooltip.questions,
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
      url: '/quiz/buckets/questions',
      icon: Images,
      tooltip: navTooltip.questionImages,
    },
    {
      title: nav.playerImages,
      url: '/quiz/buckets/players',
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
                      containsExactPath(pathName, '/' + lang + item.url)
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
              <Collapsible
                open={isImageStorOpen}
                onOpenChange={toggleImageStor}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      size={'lg'}
                      className={cn(
                        '[&>svg]:size-7 pl-0',
                        pathName.includes('buckets')
                          ? `hover:bg-primary-active bg-primary-active text-primary-foreground
                            hover:text-primary-foreground`
                          : ''
                      )}
                      tooltip={imageStore[0].tooltip}
                      onClick={onImageStoreBtnPress}
                    >
                      <Images className="pl-1" />
                      <span>{nav.imageFolders}</span>
                      <ChevronRight
                        color="white"
                        className="transition-transform ml-auto group-data-[state=open]/collapsible:rotate-90"
                      />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {imageStore.map((item, idx) => (
                        <SidebarMenuSubItem key={idx}>
                          <SidebarMenuButton
                            asChild
                            size={'lg'}
                            tooltip={item.tooltip}
                            className={cn('[&>svg]:size-7')}
                          >
                            <Link href={'/' + lang + item.url} className="w-8">
                              <span>{item.title}</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
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
