import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://estudioideamos.github.io/grosz-training-web/"),
  title: "Grosz Training | Entrenamiento y nutrición personalizada",
  description: "Planes personalizados de entrenamiento, alimentación y seguimiento real, online o presencial, con Grosz Training Group.",
  icons: { icon: "assets/grosz-logo.png" },
  openGraph: {
    title: "Grosz Training | Tu cambio, con método",
    description: "Entrenamiento, alimentación y seguimiento real para alcanzar tu próximo nivel.",
    type: "website",
    locale: "es_AR",
    images: [{ url: "og.png", width: 1732, height: 909, alt: "Grosz Training — Tu cambio, con método" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Grosz Training | Tu cambio, con método",
    description: "Entrenamiento, alimentación y seguimiento real para alcanzar tu próximo nivel.",
    images: ["og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es"><body>{children}</body></html>;
}
