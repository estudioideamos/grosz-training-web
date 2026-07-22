import type { ReactNode } from "react";

export type TrainingIconName = "target" | "nutrition" | "capsule" | "chat" | "chart" | "location" | "search" | "plan" | "training" | "adjust";

export function TrainingIcon({ name }: { name: TrainingIconName }) {
  const paths: Record<TrainingIconName, ReactNode> = {
    target: <><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/><path d="M15 9l5-5m0 0v4m0-4h-4"/></>,
    nutrition: <><path d="M12 7c-4-3-8 0-7 6 1 5 4 7 7 5 3 2 6 0 7-5 1-6-3-9-7-6Z"/><path d="M12 7c0-3 2-5 5-5M12 7c-2-2-4-2-6-1"/></>,
    capsule: <><path d="m7 17 10-10a4 4 0 0 0-6-6L1 11a4 4 0 0 0 6 6Z" transform="translate(3 3) scale(.75)"/><path d="m9 15 6-6"/></>,
    chat: <><path d="M20 11a8 8 0 0 1-9 8l-5 2 1-4a8 8 0 1 1 13-6Z"/><path d="M8 11h8M8 14h5"/></>,
    chart: <><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/><path d="m4 7 6-4 6 6 5-5"/></>,
    location: <><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="3"/></>,
    search: <><circle cx="10" cy="10" r="6"/><path d="m15 15 6 6M7 10h6M10 7v6"/></>,
    plan: <><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/></>,
    training: <><path d="M5 9v6M2 11v2M19 9v6M22 11v2M5 12h14"/><path d="M8 8v8M16 8v8"/></>,
    adjust: <><path d="M4 7h16M4 17h16M8 4v6M16 14v6"/><circle cx="8" cy="7" r="2"/><circle cx="16" cy="17" r="2"/></>,
  };

  return <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
}
