// Meta
import { Metadata } from 'next';

// Liberis
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';

// Components
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import AuthProvider from '@/components/AuthProvider/AuthProvider';

//Styles
import './globals.css';

// Fonts
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-roboto',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://next-auth-flow-zeta.vercel.app'),
  title: {
    default: 'NextAuthFlow',
    template: '%s – NextAuthFlow',
  },
  description: 'Authentication system built with Next.js App Router.',
  openGraph: {
    title: 'NextAuthFlow',
    description:
      'Authentication system built with Next.js App Router. Full auth flow with protected routes, Zustand and TanStack Query.',
    url: 'https://next-auth-flow-zeta.vercel.app',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'NextAuthFlow - authentication flow built with Next.js App Router',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NextAuthFlow',
    description:
      'Authentication system built with Next.js App Router. Full auth flow with protected routes, Zustand and TanStack Query.',
    images: ['/og.png'],
  },
};

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={roboto.variable}>
        <TanStackProvider>
          <AuthProvider>
            <Header />
            {children}
            {modal}
            <Footer />
          </AuthProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}
