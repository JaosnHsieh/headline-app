import Link from 'next/link';
import { LocaleSwitcher } from './LocaleSwitcher';

export function Header() {
  return (
    <header className="flex  items-center justify-start px-8 py-2 bg-gray-800 text-white">
      <nav className="container mx-auto p-4">
        <h1 className="text-lg font-bold inline-block">Headlines App</h1>
        <Link className="px-2 hover:underline" href="/">
          {'Headlines'}
        </Link>
        <Link className="px-2 hover:underline" href="/categories">
          {'Categories'}
        </Link>
        <span className="pl-8">
          <LocaleSwitcher />
        </span>
      </nav>
    </header>
  );
}
