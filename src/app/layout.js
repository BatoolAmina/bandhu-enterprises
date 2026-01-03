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
  title: {
    default: 'Bandhu Enterprises | Best Construction & Interior Works in Lucknow',
    template: '%s | Bandhu Enterprises'
  },
  description: 'Premium structural engineering and interior design in Lucknow. Specializing in Architectural Design, RCC Construction, Roadways, and Corporate Fit-outs since 2010.',
  keywords: [
    'Bandhu Enterprises', 
    'Bandhu',
    'Construction Company Lucknow', 
    'Construction',
    'Construction Company',
    'Interior Designer Lucknow', 
    'Interior Designer',
    'Architectural Design Lucknow', 
    'RCC Water Tank Construction', 
    'STP Construction Lucknow',
    'Waterproofing Services Lucknow',
    'Modular Workstations Lucknow',
    'Architectural Design',
    'Interior Works',
    'RCC Construction',
    'Road Construction',
    'Waterproofing Solutions',
    'Sewage Treatment Plants',
    'Structural Glazing',
    'Glow Sign Board',
    'Structural Design',
    'Soil Testing',
    'Architectural Design'
  ],
  authors: [{ name: 'Bandhu Enterprises' }],
  creator: 'Bandhu Enterprises',
  publisher: 'Bandhu Enterprises',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://bandhuenterprises.in'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Bandhu Enterprises | Engineering Excellence in Lucknow',
    description: 'Foundation of Trust, Blueprint of Excellence. Leading providers of civil infrastructure and turnkey interiors.',
    url: 'https://bandhuenterprises.in',
    siteName: 'Bandhu Enterprises',
    locale: 'en_IN',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="antialiased bg-[#FDFCF0] text-[#2D241E] font-sans">
        <Header />
        <div className="relative min-h-screen">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}