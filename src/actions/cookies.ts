'use server';

import { cookies, headers } from 'next/headers';

export async function toggleThemeCookie() {
  const theme = cookies().get('theme');
  const currentTheme = theme ? theme : 'dark';
  cookies().set('theme', currentTheme === 'dark' ? 'light' : 'dark');
}

export const getThemeCookie = async () => cookies().get('theme')?.value;

export async function setThemeCookie(mode: string) {
  cookies().set({
    name: 'theme',
    value: mode,
    path: '/',
    maxAge: 31536000,
  });
}
