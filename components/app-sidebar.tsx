import { Suspense } from "react";
import Link from "next/link";

import { History, Palette, Plus, User, User2Icon } from "lucide-react";
import { IconLogo } from "./ui/icons";
import { cn } from "@/lib/utils";

import {
  Sidebar,
  SidebarHeader,
  SideBarMenu,
  SidebarMenuItem,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Switch } from "@/components/ui/switch";

export default function AppSidebar() {
  return (
    <>
      <SidebarTrigger className="absolute z-20 top-3.5 left-3" />
      <Sidebar>
        <SidebarHeader className="flex flex-row items-center">
          <Link
            href="/"
            className="flex items-center justify-center gap-4 p-2 w-full "
          >
            <IconLogo className={cn("size-5")} />
            <span className="font-semibold text-sm">VIBERR</span>
          </Link>
        </SidebarHeader>
        <SidebarSeparator />
        <div className="flex flex-col px-2 py-4 h-full ">
          <SideBarMenu>
            <SidebarMenuItem>
              <Link
                href="/"
                className="flex items-center gap-2 py-1 px-2 ext-sm hover:bg-sidebar-foreground/10 text-foreground hover:text-foreground w-full rounded-md mb-5 justify-center bg-secondary"
              >
                New Chat
              </Link>
            </SidebarMenuItem>
            <div className="flex flex-col justify-between min-h-full">
              {/* Need to replace with proper history compnent , scrollable */}
              <div>
                <SidebarMenuItem className="mb-2">
                  <Link
                    href="/"
                    className="flex items-center gap-2 py-1 px-2 ext-sm text-foreground hover:text-foreground w-full rounded "
                  >
                    <History className="size-4" />
                    History
                  </Link>
                </SidebarMenuItem>
                <SidebarSeparator />
              </div>
              <div className="bottom-0 absolute w-full">
                <SidebarMenuItem className="my-4 flex justify-between w-full items-center px-2 pr-4">
                  <Palette size={18} />
                  Theme
                  <Switch></Switch>
                </SidebarMenuItem>
              </div>
            </div>
          </SideBarMenu>
        </div>
      </Sidebar>
    </>
  );
}
