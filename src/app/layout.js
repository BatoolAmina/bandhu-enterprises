import './globals.css';
import { Inter, Playfair_Display } from 'next/font/google';
import Script from 'next/script'; 
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { MessageCircle } from 'lucide-react';

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
    'Bandhu Enterprises', 'Construction Company Lucknow', 'Interior Designer Lucknow', 
    'Architectural Design Lucknow', 'RCC Water Tank Construction', 'STP Construction Lucknow',
    'Waterproofing Services Lucknow', 'Modular Workstations Lucknow', 'Architectural Design',
    'Interior Works', 'RCC Construction', 'Road Construction', 'Waterproofing Solutions',
    'Sewage Treatment Plants', 'Structural Glazing', 'Glow Sign Board', 'Structural Design', 'Soil Testing'
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
  alternates: { canonical: '/' },
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
  const GA_MEASUREMENT_ID = 'G-9M4GHTWLSW';
  const WHATSAPP_NUMBER = '919807606566'; 

  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
      </head>
      <body className="antialiased bg-[#FDFCF0] text-[#2D241E] font-sans">
        <Header />
        
        <div className="relative min-h-screen">
          {children}
        </div>

        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi Bandhu Enterprises, I'm interested in your construction/interior services.`}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-8 right-8 z-[9999] bg-[#25D366] text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 hover:bg-[#128C7E] flex items-center justify-center group"
          aria-label="Contact us on WhatsApp"
        >
          <MessageCircle size={28} />
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-3 transition-all duration-500 font-bold uppercase text-[10px] tracking-widest">
            Enquire Now
          </span>
        </a>

        <Footer />
      </body>
    </html>
  );
}