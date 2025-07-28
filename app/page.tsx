import { ThemeSwitcher } from "@/components/theme-switcher";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-background text-foreground">
      <h1 className="text-5xl mb-8">Theme Switcher Demo</h1>
      <ThemeSwitcher />
    </main>
  );
}
