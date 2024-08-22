# Quiz app. Nextjs admin web and back.

## Install Next project

```js
npx create-next-app@latest .
```

## Install Prisma

[Prisma quickstart doc](https://www.prisma.io/docs/getting-started/quickstart)

```js
npm i --save-dev ts-node
npm install prisma --save-dev
npx prisma init --datasource-provider postgresql
```

This will create `prisma/schema.prisma` in root dir.

If you change database run:

```js
npx prisma generate
```

[Prisma in Fullstack Next.js](https://www.prisma.io/docs/orm/more/help-and-troubleshooting/help-articles/nextjs-prisma-client-dev-practices)

- You need to create `src/db/db.ts`

To [create migration](https://www.prisma.io/docs/getting-started/quickstart)
(Create/Change database and table)

```js
npx prisma migrate dev --name init
```

## Tailwind with [shadcn](https://ui.shadcn.com/docs/installation/next) component library

Run the shadcn-ui init command to setup your project:

```js
npx shadcn-ui@latest init
```

Into the `src/lib/utils.ts` will be added `cn` function for merging class names

Add font family variable to `tailwind.config.ts`

```js
import { fontFamily } from 'tailwindcss/defaultTheme'; // <--

const config = {
  darkMode: ['class'],
  content: [
  ],
  prefix: '',
  theme: {
    container: {
      },
    },
    extend: {
      fontFamily: { // <--
        sans: ['var(--font-sans)', ...fontFamily.sans],
      },
```

Use `cn` function to config mix style in `src/app/layout.tsx`

```js
import { cn } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode,
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          // <--
          'bg-background min-h-screen font-sans antialiased',
          inter.variable // <--
        )}
      >
        {children}
      </body>
    </html>
  );
}
```

---

### Tailwind dark mode

**_To implement dark mode you should get though the next steps:_**

1. Use the css variables in root (default light) and dark classes for color
   definition in `global.css`.

2. Refer to this vars in `tailwind.config.ts` in the theme.extend.colors.

3. Implement localStorage services in `src/lib/localStor.ts` for store user
   preferences in local storage. Check the `global?.window === undefined` before
   read from local storage to prevent reading on server side render, before
   loading page code to the client browser.

4. Define `PreferencesContext` and `PreferencesProvider` in
   `src/context/preferences-provider.tsx`. Current color theme will be loaded
   from local storage in PreferencesProvider useState, and could be updated
   inside local storage by useEffect. Whereas using Next.js with his server side
   rendering, we need to use `use client` in module definition and we ought to
   check that component `PreferencesProvider` is mounted in time we call local
   storage services.

5. In `src/app/layout.tsx` wrap children of `RootLayout` into
   `PreferencesProvider`.

6. In `src/components/Nav/components/NavMenuActions.tsx` implement
   `ThemeToggleDropdownItem`. This component is a part of Navigation drop down
   menu. Click on it will toggle `PreferencesProvider` state which in turn will
   add/remove `dark` class to/from the document.documentElement inside its
   useEffect.

7. Add `ThemeToggleDropdownItem` to the `NavMenu` in
   `src/components/Nav/components/NavMenu.tsx`

---

### Next.js internationalization

[Next.js internationalization docs](https://nextjs.org/docs/app/building-your-application/routing/internationalization)
|
[Youtube video from Rendr](https://www.youtube.com/watch?v=_airUG9o97w&list=PLyPmN8OaxCPb3lCMtklvEtTFAJ6MWAKXf&index=1)
|
[Github repo with no slug on default lang](https://github.dev/rendrdotio/i18n-libraries)

**_Internalization workflow_**

- In `next.config.mjs` set permanent redirection (page that will be opened on
  server base url) **_example:_** `/quiz`

- If url doesn't contain `lang` slug , `middleware.ts` is taken into account.
  Inside the middleware we choose lang from locales in header (browser settings)
  if there are some matches between headers accept-language and locales defining
  in `i18n-config.ts` rout will be redirected to the rout with matched lang. If
  no matches occur default lang from `i18n-config.ts` will be taken.
  **_example:_** `uk/quiz` _where `uk` comes from browser settings_

- In `PreferencesProvider` on first initialization of `userPreferences` state
  from local storage, lang param set to `UNKNOWN_LOCALE`.

  On first render, check if the local storage contains lang preferences
  (userPreferences.lang !== UNKNOWN_LOCALE) If it is **first time we open the
  application** (userPreferences.lang === UNKNOWN_LOCALE) we set
  userPreferences.lang in state and local storage to the value that is come from
  url (lang has sat in middleware form browser settings)

  If it isn't first time we open app (prefs exist in local storage) and lang
  from pathName not equal to lang from prefs, rout will be redirected to the
  rout with lang from prefs.

  ```js
  if (pathNameLocale !== userPreferences.lang) {
    router.push(redirectedPathName(userPreferences.lang, pathName));
  }
  ```

- Internalization prefs are changed from `NavMenu.tsx` where setUserPreferences
  of PreferencesProvider is obtained from usePreferencesContext()
  ```js
  const { userPreferences, setUserPreferences } = usePreferencesContext();
  ```

**_[Localization](https://nextjs.org/docs/app/building-your-application/routing/internationalization#localization)_**

- We've created dictionary json file in dictionaries folder for every language.
  Also we've created `getDictionary(lang)` func for dynamic loading json file
  into pages where we need it

  ```js
  import { getDictionary } from './dictionaries';
  
  export default async function Page({ params: { lang } }) {
    const dict = await getDictionary(lang); // en
    return <button>{dict.products.cart}</button>;
  }
  ```

### Next.js cookies

[LogRocket Next.js cookie article](<https://blog.logrocket.com/guide-cookies-next-js/#:~:text=To%20read%20incoming%20request%20cookie,cookies()%3B%20const%20userId%20%3D%20cookieStore.>)

**_Preferences in cookie workflow_**

The advantage that you can take from saving preferences in cookies over local
storage is that it's independent of windows existence on client. Cookies are
available during SSR (layouts or pages that are rendered on server) through the
request header and in the middleware through NextRequest param. Therefore, you
can set internationalization rout in middleware and class for theme in
Rootlayout before client side rendering will be involved.

Notice that there are two approaches for access cookie on server side and one on
client site.

1. [The cookies function](https://nextjs.org/docs/app/api-reference/functions/cookies)
   allows you to read the HTTP incoming request cookies from a Server Component
   or write outgoing request cookies in a Server Action or Route Handler.

   ```js
   import { cookies } from 'next/headers';
   ```

2. [Cookies in Next.js middleware](https://nextjs.org/docs/app/building-your-application/routing/middleware#using-cookies)

   ```js
   export function middleware(request: NextRequest) {
     const theme = request.cookies.get('lang')?.value;
     ...
   }
   ```

3. Client side.
   [Document cookie MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie)

   To read particular cookie value from document I use function:

   ```js
   const getCookieValue = (name: string) => {
   if (global?.window !== undefined) {
    return document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop() || '';
   }
   }
   ```

#### Theme preference in cookie

[Why you can't set cookies in Server Components](https://www.youtube.com/watch?v=ejO8V5vt-7I)

Imagine you are opening site first time, cookie is empty. Middleware
`withCookieThemeMiddleware` (`src/middlewares/withCookieThemeMiddleware.ts`) set
theme cookie to "dark" if no cookie in the request. RootLayout is being rendered
on the server (`src/app/layout.tsx`), theme value came from server actions
getThemeCookie() (`src/actions/cookies.ts`) if it had been set before on the
website. Otherwise if no theme cookie obtained theme set to 'dark':
`<html className={theme || 'dark'}>`. When page is rendered on client -
PreferencesProvider (`src/context/preferences-provider.tsx`) catches change mode
event from menu (`src/components/Nav/components/NavMenu.tsx`), writes theme
value to the cookies and sets theme class in the page html tag
`document.documentElement.classList.add(userPreferences.mode)`.

```js
document.documentElement.classList.remove('dark', 'light');
document.documentElement.classList.add(userPreferences.mode);

document.cookie = `theme=${userPreferences.mode}; max-age=31536000; path=/`;
```

#### Language preference in cookie

[Implementing Multiple Middleware in Next.js](https://medium.com/@tanzimhossain2/implementing-multiple-middleware-in-next-js-combining-nextauth-and-internationalization-28d5435d3187)

Imagine you are opening site first time, cookie is empty. While middleware
`withI18nMiddleware` (`src/middlewares/withI18nMiddleware.ts`) handles request
without lang cookie, it takes lang value from locales in header (browser
settings). Then middleware redirects request accordingly to lang slug and write
it to the cookie. On the client side `PreferencesProvider` is responsible for
handling languages changes from menu and store it to cookie for future use.
