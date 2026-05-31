import type {Metadata} from "next";
import "./globals.css";
import {Header} from "@/components/Header";
import {Footer} from "@/components/Footer";
import {site} from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
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
    description: site.description
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.description
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
