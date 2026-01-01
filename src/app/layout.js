import './globals.css';
import { Inter, Playfair_Display } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata = {
  title: 'Bandhu Enterprises | Construction & Interior Design Lucknow',
  description: 'A full-service construction and interior design company specializing in architectural drawings, RCC tanks, STPs, and corporate interiors.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="antialiased bg-[#FAFAFA] text-[#1A1A1A] font-sans">
        <Header />
        <div className="relative">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}