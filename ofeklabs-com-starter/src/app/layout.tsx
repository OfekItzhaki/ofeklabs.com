import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { getSiteConfiguration } from '@/config/site-content';
import { getBaseUrl } from '@/config/urls';
import { truncate } from '@/lib/utils';
import './globals.css';

export async function generateMetadata(): Promise<Metadata> {
  const config = await getSiteConfiguration();
  const baseUrl = getBaseUrl();

  const title = truncate(
    config.tagline ? `${config.name} | ${config.tagline}` : config.name,
    60
  );
  const description = truncate(config.description || config.name, 155);

  return {
    title,
    description,
    metadataBase: new URL(baseUrl),
    alternates: { canonical: '/' },
    openGraph: {
      title,
      description,
      url: baseUrl,
      siteName: config.name,
      images: [{ url: '/og-image.png', width: 1200, height: 630 }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/og-image.png'],
    },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
