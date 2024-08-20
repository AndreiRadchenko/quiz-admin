'use server';

import { cookies } from 'next/headers';

export async function toggleThemeCookie() {
  const theme = cookies().get('theme');
  const currentTheme = theme ? theme : 'dark';
  cookies().set('theme', currentTheme === 'dark' ? 'light' : 'dark');
}

export async function getThemeCookie() {
  const theme = cookies().get('theme');
  return theme ? theme as unknown as string: 'dark';
}
