import Link from 'next/link';
import { LocaleSwitcher } from './LocaleSwitcher';
import { getDictionary } from '@/get-dictionary';
import { Locale } from '@/i18n-config';

export async function Header({ lang }: { lang: Locale }) {
  const dictionary = await getDictionary(lang);

  return (
    <header className="flex  items-center justify-start px-8 py-2 bg-gray-800 text-white">
      <nav className="container mx-auto p-4">
        <Link className="px-2 hover:underline" href="/">
          <h1 className="text-lg font-bold inline-block">{'Headlines App'}</h1>
        </Link>

        <Link className="px-2 hover:underline" href="/">
          {dictionary.nav.headlines}
        </Link>
        <Link className="px-2 hover:underline" href="/categories">
          {dictionary.nav.categories}
        </Link>
        <span className="pl-8">
          <LocaleSwitcher />
        </span>
      </nav>
    </header>
  );
}
