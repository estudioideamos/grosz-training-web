/* eslint-disable @next/next/no-img-element -- Static export uses pre-generated responsive images. */
import type { ImgHTMLAttributes } from "react";
import manifest from "../image-manifest.json";
export function ResponsiveImage({src = "", alt = "", sizes = "(max-width: 700px) 100vw, 50vw", ...props}: Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> & { src: string }) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const name = src.split("/").pop() as keyof typeof manifest;
  const info = manifest[name];
  return <img {...props} alt={alt} src={src} width={info?.width} height={info?.height} sizes={info ? sizes : undefined} srcSet={info ? [...info.variants.map(v => `${base}/${v.src} ${v.width}w`), `${src} ${info.width}w`].join(", ") : undefined} />;
}


