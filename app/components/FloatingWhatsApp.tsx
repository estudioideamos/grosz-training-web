"use client";
import { useEffect, useState } from "react";
import { ResponsiveImage } from "./ResponsiveImage";
export function FloatingWhatsApp({ href }: { href: string }) {
  const [creditVisible, setCreditVisible] = useState(false);
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  useEffect(() => {
    const credit = document.getElementById("ideamos-credit");
    if (!credit) return;
    const observer = new IntersectionObserver(([entry]) => setCreditVisible(entry.isIntersecting), { rootMargin: "0px 0px 96px 0px" });
    observer.observe(credit);
    return () => observer.disconnect();
  }, []);
  return <a className="floating-whatsapp" href={href} target="_blank" rel="noopener noreferrer" aria-label="Hablemos por WhatsApp" hidden={creditVisible}>
    <span><ResponsiveImage src={`${basePath}/assets/whatsapp.svg`} alt="" /></span><b>Hablemos</b>
  </a>;
}
