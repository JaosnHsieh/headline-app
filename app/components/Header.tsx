import Link from 'next/link';

export function Header() {
  return (
    <header className="flex items-center justify-start px-8 py-2 bg-gray-800 text-white">
      <h1 className="text-lg font-bold">Headlines App</h1>
      <nav>
        <Link className="px-2 hover:underline" href="/">
          {'Headlines'}
        </Link>
        <Link className="px-2 hover:underline" href="/categories">
          {'Categories'}
        </Link>
      </nav>
    </header>
  );
}
