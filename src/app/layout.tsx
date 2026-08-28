import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://metademic.org"),
  title: { default: "Metademic — An academic AI lab", template: "%s — Metademic" },
  description: "An academic AI lab & scholarly platform. Open research at metademic.com. RACN — hybrid P2P LLM: install the node once, use it everywhere on the web.",
  openGraph: { title: "Metademic — An academic AI lab", description: "Open research + RACN hybrid P2P supercompute.", type: "website", url: "https://metademic.org", siteName: "Metademic" },
  twitter: { card: "summary_large_image", title: "Metademic — An academic AI lab", description: "Open research + RACN hybrid P2P." },
  alternates: { canonical: "https://metademic.org" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-zinc-900">
        <JsonLd data={{ "@context": "https://schema.org", "@type": "Organization", name: "Metademic", url: "https://metademic.org", sameAs: ["https://www.metademic.com"] }} />
        <JsonLd data={{ "@context": "https://schema.org", "@type": "WebSite", name: "Metademic", url: "https://metademic.org", potentialAction: { "@type": "SearchAction", target: "https://metademic.org/research/{search_term_string}", "query-input": "required name=search_term_string" } }} />
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-black focus:px-4 focus:py-2 focus:text-sm focus:text-white">Skip to content</a>
        <Navbar />
        <main id="main" className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
