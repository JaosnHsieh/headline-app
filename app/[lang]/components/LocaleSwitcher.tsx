'use client';

import { usePathname, useRouter } from 'next/navigation';
import { i18n, type Locale } from '../../../i18n-config';

export function LocaleSwitcher() {
  const pathName = usePathname();
  const router = useRouter();

  const getLocalePath = (locale: Locale) => {
    if (!pathName) return '/';
    const segments = pathName.split('/');
    segments[1] = locale;
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
