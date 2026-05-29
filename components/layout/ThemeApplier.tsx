"use client";

import { useEffect } from "react";
import { useUIStore } from "@/store/useUIStore";

export function ThemeApplier() {
  const theme = useUIStore((s) => s.theme);
  const setTheme = useUIStore((s) => s.setTheme);

  // Restore saved preference on first mount
  useEffect(() => {
    const saved = localStorage.getItem("campus-theme") as "light" | "dark" | "system" | null;
    if (saved) setTheme(saved);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const root = document.documentElement;

    const apply = (isDark: boolean) => root.classList.toggle("dark", isDark);

    if (theme === "dark") {
      apply(true);
    } else if (theme === "light") {
      apply(false);
    } else {
      const mq = window.matchMedia("(prefers-color-scheme: dark)");
      apply(mq.matches);
      const handler = (e: MediaQueryListEvent) => apply(e.matches);
      mq.addEventListener("change", handler);
      return () => mq.removeEventListener("change", handler);
    }

    localStorage.setItem("campus-theme", theme);
  }, [theme]);

  return null;
}
