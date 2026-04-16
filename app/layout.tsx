import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const DEFAULT_SITE_URL = "https://scarperapi.vercel.app";

function getMetadataBase() {
  const siteUrl =
    process.env.NEXT_PUBLIC_APP_URL ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    DEFAULT_SITE_URL;

  try {
    return new URL(siteUrl);
  } catch {
    return new URL(DEFAULT_SITE_URL);
  }
}

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: "ScraperAPI - Free Movie API & Streaming Links | Download & Watch Online",
  description: "Free Movie API for developers. Access streaming links, download options, and movie details from KMMovies, AnimeSalt, NetMirror. Get Bollywood, Hollywood, anime content with free API keys. Best free movie scraper API for movies, TV shows, and anime streaming.",
  keywords: [
    "free movie api",
    "free streaming api",
    "movie scraper api",
    "anime api free",
    "download movie api",
    "streaming links api",
    "bollywood api",
    "hollywood api",
    "free movies download",
    "movie database api",
    "kmmovies api",
    "animesalt api",
    "netmirror api",
    "watch movies online free",
    "movie streaming api",
    "tv shows api",
    "free content api",
    "movie details api",
    "imdb api alternative",
    "free movie scraper",
    "movie api with download links",
    "anime streaming api",
    "dual audio movies api",
    "hindi dubbed movies api",
    "4k movies api",
    "web scraping api",
    "movie search api",
    "free api for movies",
    "movie metadata api",
    "open source movie api"
  ],
  authors: [{ name: "Anshu" }],
  creator: "Anshu",
  publisher: "ScraperAPI",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://scarperapi.vercel.app",
    siteName: "ScraperAPI",
    title: "ScraperAPI - Free Movie API & Streaming Links",
    description: "Free Movie API for developers. Access streaming links, download options from multiple providers. Bollywood, Hollywood, anime content with free API keys.",
    images: [
      {
        url: "/logo.svg",
        width: 1200,
        height: 630,
        alt: "ScraperAPI - Free Movie API",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ScraperAPI - Free Movie API & Streaming Links",
    description: "Free Movie API for developers. Access streaming links, download options, and movie details from multiple providers.",
    images: ["/logo.svg"],
    creator: "@anshu78780",
  },
  icons: {
    icon: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${outfit.variable} antialiased`}
        style={{ fontFamily: 'var(--font-outfit)' }}
      >
       
        {children}
      </body>
    </html>
  );
}
