"use client";

import Chat from "@/components/chat";
import { useSidebar } from "@/components/ui/sidebar";

export default function Home() {
  const { state, toggleSidebar } = useSidebar();
  console.log("Sidebar state:", state);

  return <Chat />;
}
