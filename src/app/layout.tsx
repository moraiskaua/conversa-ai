import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Conversa Ai',
  description: 'Chatbot',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="pt-BR">
        <link rel="shortcut icon" href="/images/logo.png" type="image/x-icon" />
        <body className={inter.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
