import { Inter } from 'next/font/google';
import { DashboardIndex } from '.';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <DashboardIndex>{children}</DashboardIndex>
      </body>
    </html>
  );
}
