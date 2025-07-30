"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeChanger() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // ensure we only render <select> once we're hydrated
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <select
      value={theme}
      onChange={(e) => setTheme(e.target.value)}
      className="p-2 border rounded"
    >
      <option value="light">Light</option>
      <option value="dark">Dark</option>
    </select>
  );
}
