import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { Playfair_Display, Inter, Tajawal } from "next/font/google";
import type { Metadata, Viewport } from 'next';

import "../globals.css";
import ReactQueryProvider from '../../lib/providers/ReactQueryProvider';
import { Directions, Languages } from '@/src/shared/constans/enums';

// Premium engagement fonts
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-arabic",
  display: "swap",
});

/* ─── SEO Metadata ───────────────────────────────────────── */
export const metadata: Metadata = {
  title: 'حفل خطوبة أحمد & ندى — ١٦ يوليو ٢٠٢٦',
  description:
    'يشرف عليكم أحمد وندى بدعوتكم لحضور حفل خطوبتهما — الخميس ١٦ يوليو ٢٠٢٦ في كوف، المنصورة على ضفاف النيل.',
  keywords: [
    'حفل خطوبة',
    'أحمد وندى',
    'دعوة خطوبة',
    'engagement party',
    'Ahmed and Nada',
    'Cove Mansoura',
    'المنصورة',
  ],
  authors: [{ name: 'Ahmed & Nada' }],
  creator: 'Ahmed & Nada',
  robots: {
    index: false,   // private invitation — don't index publicly
    follow: false,
  },
  openGraph: {
    type: 'website',
    locale: 'ar_EG',
    title: 'أحمد & ندى — حفل الخطوبة 💍',
    description:
      'نتشرف بدعوتكم لحضور حفل خطوبة أحمد وندى — ١٦ يوليو ٢٠٢٦، كوف، المنصورة',
    siteName: 'حفل خطوبة أحمد & ندى',
    images: [
      {
        url: '/og-image.jpg',   // place a 1200×630 image at public/og-image.jpg
        width: 1200,
        height: 630,
        alt: 'حفل خطوبة أحمد & ندى',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'أحمد & ندى — حفل الخطوبة 💍',
    description: 'نتشرف بدعوتكم — ١٦ يوليو ٢٠٢٦، كوف، المنصورة',
    images: ['/og-image.jpg'],
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
};

export const viewport: Viewport = {
  themeColor: '#800020',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale} dir={locale === Languages.ARABIC ? Directions.RTL : Directions.LTR}>
      <body className={`${playfair.variable} ${inter.variable} ${tajawal.variable} antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <ReactQueryProvider>
            <NuqsAdapter>
              {children}
            </NuqsAdapter>
          </ReactQueryProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
