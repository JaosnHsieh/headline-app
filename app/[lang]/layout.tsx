import type { Metadata } from 'next';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import './globals.css';
import { Locale } from '@/i18n-config';

export const metadata: Metadata = {
  title: 'Headline app',
  description:
    'a simple headline apps to browse different news in multiple languages',
};

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: {
    lang: Locale;
  };
}>) {
  return (
    <html lang="en">
      <body>
        <Header lang={params.lang} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
