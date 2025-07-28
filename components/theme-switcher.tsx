"use client";

import { useTheme } from "next-themes";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  console.log("Current theme:", theme);

  return (
    <div className="flex gap-2">
      <button onClick={() => setTheme("light")}>Light</button>
      <button onClick={() => setTheme("dark")}>Dark</button>
      <button onClick={() => setTheme("red")}>Red</button>
    </div>
  );
}
