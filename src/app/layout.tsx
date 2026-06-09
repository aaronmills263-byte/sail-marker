import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Sail Marker — Charter Destinations, Mapped",
    template: "%s | Sail Marker",
  },
  description:
    "Discover the world's finest sailing destinations. Charter yachts, explore cruising grounds, plan itineraries across the Mediterranean, Caribbean, and beyond.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.sailmarker.com"
  ),
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.sailmarker.com",
    siteName: "Sail Marker",
    title: "Sail Marker — Charter Destinations, Mapped",
    description:
      "Discover the world's finest sailing destinations. Charter yachts, explore cruising grounds, plan itineraries.",
    images: [{ url: "/og-default.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sail Marker — Charter Destinations, Mapped",
    description:
      "Discover the world's finest sailing destinations and charter grounds.",
  },
  other: {
    "ai:site_type": "sailing-charter-directory",
    "ai:coverage": "worldwide",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&family=DM+Sans:wght@300;400;500;600;700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        />
      </head>
      <body className="min-h-screen bg-sail-200 text-navy-700 antialiased">
        {children}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
      </body>
    </html>
  );
}
