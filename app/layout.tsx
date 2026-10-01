import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const bebasNeue = localFont({
  src: "../public/fonts/bebas-neue-v16-latin.woff2",
  variable: "--font-bebas-neue",
  weight: "400",
  style: "normal",
  display: "swap",
});

const openSans = localFont({
  src: [
    {
      path: "../public/fonts/open-sans-v44-latin.woff2",
      weight: "300 800",
      style: "normal",
    },
    {
      path: "../public/fonts/open-sans-v44-latin-italic.woff2",
      weight: "300 800",
      style: "italic",
    },
  ],
  variable: "--font-open-sans",
  display: "swap",
});

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const siteUrl = process.env.SITE_URL || "https://estudioideamos.github.io/grosz-training-web/";

export const metadata: Metadata = {
  alternates: { canonical: "./" },
  robots: process.env.SITE_INDEXABLE === "true" ? { index: true, follow: true } : { index: false, follow: false },
  metadataBase: new URL(siteUrl),
  title: "Grosz Training | Entrenamiento y nutrición personalizada",
  description: "Planes personalizados de entrenamiento, alimentación y seguimiento real, online o presencial, con Grosz Training Group.",
  icons: { icon: `${basePath}/assets/grosz-logo.png` },
  openGraph: {
    title: "Grosz Training | Tu cambio, con método",
    description: "Entrenamiento, alimentación y seguimiento real para alcanzar tu próximo nivel.",
    type: "website",
    locale: "es_AR",
    images: [{ url: "og.webp", width: 1731, height: 909, alt: "Grosz Training — Tu cambio, con método" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Grosz Training | Tu cambio, con método",
    description: "Entrenamiento, alimentación y seguimiento real para alcanzar tu próximo nivel.",
    images: ["og.webp"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es" className={`${bebasNeue.variable} ${openSans.variable}`}><body><a className="skip-link" href="#main-content">Saltar al contenido</a>{children}</body></html>;
}
