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
    <html lang="en" suppressHydrationWarning>
      <head>
        <link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet" />
      </head>
      <body // Removed whitespace between html and body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          inter.variable
        )}
      >
        {children}
        <Toaster /> {/* Add Toaster */}
        <div className="social-icons" style={{ textAlign: 'center', marginBottom: '20px', fontSize: '25px' }}> {/* Added a div for centering and spacing */}
          <a href="https://www.instagram.com/_s.d.nil_?igsh=YzljYTk1ODg3Zg==" target="_blank" className="footer-social" style={{ margin: '0 10px' }}><i className="bx bxl-instagram" style={{ fontSize: '25px' }}></i></a> {/* Added margin for spacing */}
          <a href="https://www.facebook.com/share/15ZjjcF7VE/" target="_blank" className="footer-social" style={{ margin: '0 10px' }}><i className="bx bxl-facebook" style={{ fontSize: '25px' }}></i></a> {/* Added margin for spacing */}
          <a href="https://github.com/S-D-Nil" target="_blank" className="about-social-icon" style={{ margin: '0 10px' }}><i className="bx bxl-github" style={{ fontSize: '25px' }}></i></a> {/* Added margin for spacing */}
        </div>
      </body>
    </html>
  );
}
