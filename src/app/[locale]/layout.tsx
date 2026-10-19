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
  title: 'حفل زفاف محمد & آيه — ٢٤ أكتوبر ٢٠٢٦',
  description:
    'يتشرف محمد وآيه بدعوتكم لحضور حفل زفافهما — السبت ٢٤ أكتوبر ٢٠٢٦ في القاعة الملكية، جرجا، سوهاج.',
  keywords: [
    'حفل زفاف',
    'محمد وآيه',
    'دعوة زفاف',
    'wedding invitation',
    'Mohamed and Aya',
    'القاعة الملكية',
    'جرجا',
    'سوهاج',
  ],
  authors: [{ name: 'Mohamed & Aya' }],
  creator: 'Mohamed & Aya',
  robots: {
    index: false,   // private invitation — don't index publicly
    follow: false,
  },
  openGraph: {
    type: 'website',
    locale: 'ar_EG',
    title: 'محمد & آيه — حفل الزفاف 💍',
    description:
      'نتشرف بدعوتكم لحضور حفل زفاف محمد وآيه — ٢٤ أكتوبر ٢٠٢٦، القاعة الملكية، جرجا، سوهاج',
    siteName: 'حفل زفاف محمد & آيه',
    images: [
      {
        url: '/og-image.jpg',   // place a 1200×630 image at public/og-image.jpg
        width: 1200,
        height: 630,
        alt: 'حفل زفاف محمد & آيه',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'محمد & آيه — حفل الزفاف 💍',
    description: 'نتشرف بدعوتكم — ٢٤ أكتوبر ٢٠٢٦، القاعة الملكية، جرجا، سوهاج',
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
