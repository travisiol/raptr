import type { Metadata } from "next";
import { Archivo, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { EntryBanner } from "@/components/EntryBanner";
import { Footer } from "@/components/Footer";
import { WalletProvider } from "@/components/WalletProvider";
import { site } from "@/lib/site";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  weight: ["500", "600", "700", "800", "900"],
  display: "swap",
});

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-plex-sans",
  weight: ["400", "500", "600"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-plex-mono",
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.domain + " — " + site.tagline,
    template: "%s — " + site.domain,
  },
  description:
    "One daily round, three picks and a seven-day season. Make your calls, climb the standings and follow the reserve behind the rewards.",
  openGraph: {
    title: site.domain + " — " + site.tagline,
    description: "One daily round. Three picks. Seven-day seasons.",
    url: site.url,
    siteName: site.domain,
    type: "website",
  },
  twitter: { card: "summary_large_image", creator: site.social.handle },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={archivo.variable + " " + plexSans.variable + " " + plexMono.variable}>
      <body>
        <WalletProvider>
          <Navbar />
          <EntryBanner />
          <main>{children}</main>
          <Footer />
        </WalletProvider>
      </body>
    </html>
  );
}
