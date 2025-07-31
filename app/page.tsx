"use client";

import { useSidebar } from "@/components/ui/sidebar";

export default function Home() {
  const { state, toggleSidebar } = useSidebar();
  console.log("Sidebar state:", state);

  return (
    <>
      <div className="bg-sidebar p-5 m-auto flex justify-center items-center">
        Hello world !
      </div>
    </>
  );
}
