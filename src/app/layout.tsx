import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';

import PreferencesProvider from '@/context/PreferencesProvider';
import SystemStateProvider from '@/context/SystemStateProvider';

import './globals.css';
import { cn } from '@/lib/utils';
import { getDictionary } from '../../dictionaries/dictionaries';
import { getThemeCookie } from '@/actions/cookies';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: '1% Club Dashboard',
  description: '1% quiz admin dashboard',
};

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'uk' }];
}

type Props = {
  children: React.ReactNode;
  params: { lang: string };
};

export default async function RootLayout({
  children,
  params: { lang },
}: Readonly<Props>) {
  const dict = await getDictionary(lang);
  const theme = await getThemeCookie();

  return (
    <html lang="en" className={theme || 'dark'}>
      <body
        className={cn(' bg-background font-sans antialiased', inter.variable)}
      >
        <PreferencesProvider>
          <SystemStateProvider>{children}</SystemStateProvider>
          {/* {children} */}
        </PreferencesProvider>
        <Toaster />
      </body>
    </html>
  );
}
