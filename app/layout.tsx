import type React from 'react';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { PageTransition } from '@/components/page-transition';
import './globals.css';

const _geist = Geist({ subsets: ['latin'] });
const _geistMono = Geist_Mono({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Aravind Sathesh',
  description: 'Aravind Sathesh - Professional Portfolio, Full Stack Developer',
  icons: {
    icon: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta
          name='description'
          content='Aravind Sathesh - Professional Portfolio, Full Stack Developer'
        />
        <meta property='og:title' content='Aravind Sathesh Portfolio' />
        <meta
          property='og:description'
          content='Aravind Sathesh - Professional Portfolio, Full Stack Developer'
        />
        <meta property='og:image' content='/og-image.png' />
        <meta property='og:type' content='website' />
        <meta property='og:url' content='https://aravindsathesh.com' />
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:title' content='Aravind Sathesh Portfolio' />
        <meta
          name='twitter:description'
          content='Aravind Sathesh - Professional Portfolio, Full Stack Developer'
        />
        <meta name='twitter:image' content='/og-image.png' />
        <link rel='icon' href='/favicon.png' />
        <script
          dangerouslySetInnerHTML={{
            __html: `
                try {
                  const theme = localStorage.getItem('theme');
                  if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              `,
          }}
        />
      </head>
      <body className={`font-sans antialiased`}>
        <PageTransition />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
