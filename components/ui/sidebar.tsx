"use client";
import { cn } from "@/lib/utils";
import * as React from "react";
import { Button } from "./button";
import { PanelLeft } from "lucide-react";
import { Separator } from "./separator";

const SIDEBAR_WIDTH = "18rem";
const SIDEBAR_WIDTH_ICON = "0rem";

type SidebarContextProps = {
  state: "expanded" | "collapsed";
  open: boolean;
  setOpen: (open: boolean) => void;
  toggleSidebar: () => void;
};
const SidebarContext = React.createContext<SidebarContextProps | null>(null);

export const useSidebar = () => {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

const SidebarProvider: React.FC<
  React.ComponentProps<"div"> & {
    defaultOpen?: boolean;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
  }
> = ({
  defaultOpen = true,
  open: openProp,
  onOpenChange: setOpenProp,
  ref,
  className,
  style,
  children,
  ...props
}) => {
  const [_open, _setOpen] = React.useState(defaultOpen);
  const [isHydrated, setIsHydrated] = React.useState(false);

  React.useEffect(() => {
    setIsHydrated(true);
  }, []);

  const open = openProp ?? _open;
  const state = open ? "expanded" : "collapsed";

  const setOpen = React.useCallback(
    (value: boolean | ((value: boolean) => boolean)) => {
      const openState = typeof value === "function" ? value(open) : value;
      if (setOpenProp) {
        setOpenProp(openState);
      } else {
        _setOpen(openState);
      }
    },
    [setOpenProp, open]
  );

  const toggleSidebar = React.useCallback(() => {
    setOpen((open) => !open);
  }, [setOpen]);

  const contextValue = React.useMemo<SidebarContextProps>(
    () => ({
      state,
      open,
      setOpen,
      toggleSidebar,
    }),
    [state, open, setOpen, toggleSidebar]
  );
  return (
    <SidebarContext.Provider value={contextValue}>
      <div
        ref={ref}
        {...props}
        style={{ ...style } as React.CSSProperties}
        className={cn(
          "flex min-h-svh w-full",
          // Prevent flash during hydration
          !isHydrated && "opacity-0",
          isHydrated && "opacity-100 transition-opacity duration-150",
          className
        )}
        suppressHydrationWarning
      >
        {children}
      </div>
    </SidebarContext.Provider>
  );
};

SidebarProvider.displayName = "SidebarProvider"; // for better debugging

const Sidebar: React.FC<React.ComponentProps<"div"> & {}> = ({
  ref,
  className,
  children,
  ...props
}) => {
  const { state } = useSidebar();
  const width = state === "expanded" ? SIDEBAR_WIDTH : SIDEBAR_WIDTH_ICON;
  return (
    <div
      ref={ref}
      className={cn(
        "relative flex min-h-full bg-sidebar text-sidebar-foreground border-r border-sidebar-border overflow-hidden flex-col z-10 transition-width duration-150 ease-linear",
        className
      )}
      style={{ width }}
      {...props}
    >
      <div>{children}</div>
    </div>
  );
};
Sidebar.displayName = "Sidebar";

const SidebarTrigger: React.FC<React.ComponentProps<typeof Button>> = ({
  className,
  onClick,
  ref,
  ...props
}) => {
  const { toggleSidebar } = useSidebar();

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      className={cn("size-6 cursor-pointer", className)}
      onClick={(event) => {
        onClick?.(event);
        toggleSidebar();
      }}
      {...props}
    >
      <PanelLeft size={18} />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  );
};
SidebarTrigger.displayName = "SidebarTrigger";

const SidebarHeader: React.FC<React.ComponentProps<"div">> = ({
  className,
  ref,
  ...props
}) => {
  return (
    <div
      ref={ref}
      data-sidebar="header"
      className={cn("flex flex-col gap-4 p-2", className)}
      {...props}
    />
  );
};
SidebarHeader.displayName = "SidebarHeader";

const SidebarSeparator: React.FC<React.ComponentProps<typeof Separator>> = ({
  className,
  ref,
  ...props
}) => {
  return (
    <Separator
      ref={ref}
      className={cn("mx-2 px-2 bg-sidebar-border", className)}
      {...props}
    />
  );
};
SidebarSeparator.displayName = "SidebarSeparator";

const SideBarMenu: React.FC<React.ComponentProps<"ul">> = ({
  className,
  ref,
  ...props
}) => {
  return (
    <ul
      className={cn("flex w-full min-w-0 flex-col gap-1", className)}
      {...props}
      ref={ref}
    ></ul>
  );
};

SideBarMenu.displayName = "SidebarMenu";

const SidebarMenuItem: React.FC<React.ComponentProps<"li">> = ({
  className,
  ref,
  ...props
}) => {
  const { state } = useSidebar();
  return (
    <li
      className={cn(
        "flex w-full min-w-0 items-center mb-5 transition-all ease-linear duration-100 cursor-pointer",
        state === "collapsed" ? "hidden" : "block",
        className
      )}
      {...props}
      ref={ref}
    />
  );
};

SidebarMenuItem.displayName = "SidebarMenuItem";

export {
  SidebarProvider,
  Sidebar,
  SidebarTrigger,
  SidebarHeader,
  SidebarSeparator,
  SideBarMenu,
  SidebarMenuItem,
};
