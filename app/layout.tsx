import type {Metadata} from "next";
import "./globals.css";
import {Header} from "@/components/Header";
import {Footer} from "@/components/Footer";
import {site} from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  applicationName: site.name,
  authors: [{name: "Solo App Stack Editorial", url: site.url}],
  creator: site.name,
  publisher: site.name,
  category: "technology",
  title: {
    default: `${site.name} - ${site.tagline}`,
    template: `%s | ${site.name}`
  },
  description: site.description,
  openGraph: {
    type: "website",
    siteName: site.name,
    url: site.url,
    title: site.name,
    description: site.description,
    images: [{url: "/images/solo-workspace-hero.webp", width: 1792, height: 1024, alt: "Solo App Stack software workspace"}]
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.description,
    images: ["/images/solo-workspace-hero.webp"]
  }
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body>
        {site.gaId ? <script async src={`https://www.googletagmanager.com/gtag/js?id=${site.gaId}`} /> : null}
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
