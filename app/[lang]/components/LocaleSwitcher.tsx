'use client';

import { usePathname, useRouter } from 'next/navigation';
import { i18n, type Locale, LOCALE_COOKIE_NAME } from '../../../i18n-config';

function setCookie(cname: string, cvalue: string, exdays = 360) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = 'expires=' + d.toUTCString();
  document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
}

export function LocaleSwitcher() {
  const pathName = usePathname();
  const router = useRouter();

  const getLocalePath = (locale: Locale) => {
    if (!pathName) return '/';
    const segments = pathName.split('/');
    segments[1] = locale;
    setCookie(LOCALE_COOKIE_NAME, locale);
    return segments.join('/');
  };

  return (
    <select
      className="text-black"
      value={pathName.split('/')[1]}
      onChange={(e) => {
        const newLocale = e.target.value as (typeof i18n.locales)[number];
        const newPath = getLocalePath(newLocale);
        router.push(newPath);
      }}
    >
      {i18n.locales.map((locale) => (
        <option key={locale} value={locale}>
          {locale}
        </option>
      ))}
    </select>
  );
}
