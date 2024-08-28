import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import { Toaster } from '@/components/ui/toaster';

const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'] });

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
        <body className={jakarta.className}>
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
