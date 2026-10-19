import type { Metadata } from 'next';
import InvitationApp from '@/src/components/InvitationApp';

/* ─── Per-locale page metadata ───────────────────────────── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isArabic = locale === 'ar';

  return {
    title: isArabic
      ? 'حفل زفاف محمد & آيه — ٢٤ أكتوبر ٢٠٢٦'
      : 'Mohamed & Aya — Wedding Celebration · October 24, 2026',
    description: isArabic
      ? 'نتشرف بدعوتكم لحضور حفل زفاف محمد وآيه — السبت ٢٤ أكتوبر ٢٠٢٦، القاعة الملكية، جرجا، سوهاج.'
      : 'You are cordially invited to celebrate the wedding of Mohamed & Aya — Saturday, October 24 2026, The Royal Hall, Girga, Sohag, Egypt.',
    openGraph: {
      title: isArabic
        ? 'محمد & آيه — حفل الزفاف 💍'
        : 'Mohamed & Aya — Wedding Celebration 💍',
      description: isArabic
        ? 'نتشرف بدعوتكم — ٢٤ أكتوبر ٢٠٢٦، القاعة الملكية، جرجا'
        : 'Join us to celebrate — October 24, 2026 · The Royal Hall, Girga',
    },
  };
}

/* ─── JSON-LD structured data ────────────────────────────── */
function JsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: 'حفل زفاف محمد & آيه',
    alternateName: 'Mohamed & Aya Wedding Celebration',
    description:
      'حفل زفاف محمد وآيه — السبت ٢٤ أكتوبر ٢٠٢٦ في القاعة الملكية، جرجا، سوهاج.',
    startDate: '2026-10-24T21:00:00+02:00',
    endDate: '2026-10-25T02:00:00+02:00',
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location: {
      '@type': 'Place',
      name: 'The Royal Hall — القاعة الملكية',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Girga',
        addressRegion: 'Sohag',
        addressCountry: 'EG',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 26.3481769,
        longitude: 31.8891811,
      },
    },
    organizer: [
      { '@type': 'Person', name: 'محمد', alternateName: 'Mohamed' },
      { '@type': 'Person', name: 'آيه',  alternateName: 'Aya'  },
    ],
    image: '/og-image.jpg',
    inLanguage: ['ar', 'en'],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/* ─── Page ───────────────────────────────────────────────── */
export default function HomePage() {
  return (
    <>
      <JsonLd />
      <InvitationApp />
    </>
  );
}
