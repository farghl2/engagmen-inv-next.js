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
      ? 'حفل خطوبة أحمد & ندى — ١٦ يوليو ٢٠٢٦'
      : 'Ahmed & Nada — Engagement Party · July 16, 2026',
    description: isArabic
      ? 'نتشرف بدعوتكم لحضور حفل خطوبة أحمد وندى — الخميس ١٦ يوليو ٢٠٢٦، كوف، المنصورة على ضفاف النيل.'
      : 'You are cordially invited to celebrate the engagement of Ahmed & Nada — Thursday, July 16 2026, Cove, Mansoura, Egypt.',
    openGraph: {
      title: isArabic
        ? 'أحمد & ندى — حفل الخطوبة 💍'
        : 'Ahmed & Nada — Engagement Party 💍',
      description: isArabic
        ? 'نتشرف بدعوتكم — ١٦ يوليو ٢٠٢٦، كوف، المنصورة'
        : 'Join us to celebrate — July 16, 2026 · Cove, Mansoura',
    },
  };
}

/* ─── JSON-LD structured data ────────────────────────────── */
function JsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: 'حفل خطوبة أحمد & ندى',
    alternateName: 'Ahmed & Nada Engagement Party',
    description:
      'حفل خطوبة أحمد وندى — الخميس ١٦ يوليو ٢٠٢٦ في كوف، المنصورة على ضفاف النيل.',
    startDate: '2026-07-16T18:00:00+02:00',
    endDate: '2026-07-16T23:59:00+02:00',
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location: {
      '@type': 'Place',
      name: 'Cove — كوف',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Mansoura',
        addressRegion: 'Dakahlia',
        addressCountry: 'EG',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 31.0409,
        longitude: 31.3785,
      },
    },
    organizer: [
      { '@type': 'Person', name: 'أحمد', alternateName: 'Ahmed' },
      { '@type': 'Person', name: 'ندى',  alternateName: 'Nada'  },
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
