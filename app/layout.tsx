import type { Metadata } from 'next';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import './globals.css';

export const metadata: Metadata = {
  title: 'Headline app',
  description:
    'a simple headline apps to browse different news in multiple languages',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
