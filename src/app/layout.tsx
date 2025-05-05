import type { Metadata } from 'next';
import { Inter } from 'next/font/google'; // Using Inter for a clean look
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster'; // Import Toaster
import './script'; // Import script
import React from 'react'; // Import React

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans', // Assign to a CSS variable
});

export const metadata: Metadata = {
  title: 'TaskFlow', // Updated App Name based on proposal
  description: 'A simple and clean todo list application.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning><body // Removed whitespace between html and body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          inter.variable
        )}
      >
        {children}
        <Toaster /> {/* Add Toaster */}
      </body>
    </html>
  );
}
