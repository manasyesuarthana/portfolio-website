import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const siteUrl = "https://manasye-portfolio.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Manasye Suarthana — Portfolio",
  description:
    "Manasye Suarthana's portfolio — software engineer specializing in cloud infrastructure, DevOps, and full-stack development. Explore projects, experience, and skills.",
  keywords: [
    "Manasye",
    "Manasye Suarthana",
    "I Putu Herjuna Manasye Suarthana",
    "software engineer",
    "portfolio",
    "DevOps",
    "cloud infrastructure",
    "full-stack developer",
    "AWS",
    "Terraform",
    "Next.js",
  ],
  authors: [{ name: "Manasye Suarthana", url: siteUrl }],
  creator: "Manasye Suarthana",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Manasye Suarthana — Portfolio",
    title: "Manasye Suarthana — Portfolio",
    description:
      "Software engineer specializing in cloud infrastructure, DevOps, and full-stack development. Explore projects, experience, and skills.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Manasye Suarthana — Portfolio",
    description:
      "Software engineer specializing in cloud infrastructure, DevOps, and full-stack development.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Manasye Suarthana",
  alternateName: "I Putu Herjuna Manasye Suarthana",
  url: siteUrl,
  jobTitle: "Software Engineer",
  sameAs: [
    "https://github.com/manasyesuarthana",
    "https://www.linkedin.com/in/i-putu-herjuna-manasye-suarthana-6a1b93294/",
    "https://instagram.com/manasyesuarthana",
  ],
  email: "manasyesuarthana@gmail.com",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
