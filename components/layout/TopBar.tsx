"use client";

import { usePathname, useRouter } from "next/navigation";
import { Bell, Search, Menu, ChevronRight, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUIStore } from "@/store/useUIStore";
import { useAuthStore } from "@/store/useAuthStore";
import { useNotificationStore } from "@/store/useNotificationStore";
import { getInitials, cn } from "@/lib/utils";
import { ROLE_LABELS } from "@/lib/constants";

function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  const formatSegment = (s: string) =>
    s.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <nav className="flex items-center gap-1 text-sm text-muted-foreground">
      {segments.map((seg, i) => (
        <div key={i} className="flex items-center gap-1">
          {i > 0 && <ChevronRight className="size-3.5" />}
          <span className={cn(i === segments.length - 1 ? "text-foreground font-medium" : "")}>
            {formatSegment(seg)}
          </span>
        </div>
      ))}
    </nav>
  );
}

export function TopBar() {
  const router = useRouter();
  const { setCommandPaletteOpen, setNotificationPanelOpen, toggleSidebar, theme, setTheme } = useUIStore();
  const { user, role, signOut } = useAuthStore();
  const { unreadCount } = useNotificationStore();

  const handleSignOut = async () => {
    signOut();
    router.push("/login");
  };

  return (
    <header className="h-14 border-b border-border bg-background/80 backdrop-blur-md flex items-center px-4 gap-4 sticky top-0 z-30">
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden"
        onClick={toggleSidebar}
      >
        <Menu className="size-4" />
      </Button>

      <div className="flex-1 min-w-0">
        <Breadcrumbs />
      </div>

      <div className="flex items-center gap-2">
        {/* Search trigger */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCommandPaletteOpen(true)}
          className="hidden sm:flex items-center gap-2 text-muted-foreground w-52 justify-between"
        >
          <div className="flex items-center gap-2">
            <Search className="size-3.5" />
            <span className="text-sm">Search...</span>
          </div>
          <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100">
            <span className="text-xs">⌘</span>K
          </kbd>
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="sm:hidden"
          onClick={() => setCommandPaletteOpen(true)}
        >
          <Search className="size-4" />
        </Button>

        {/* Theme toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
        </Button>

        {/* Notifications */}
        <Button
          variant="ghost"
          size="icon"
          className="relative"
          onClick={() => setNotificationPanelOpen(true)}
        >
          <Bell className="size-4" />
          {unreadCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 size-4 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </Button>

        {/* User menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="size-8">
                <AvatarImage src={user?.avatarUrl ?? undefined} />
                <AvatarFallback className="text-xs">{getInitials(user?.name ?? "U")}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user?.name}</p>
                <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                <p className="text-xs text-primary font-medium mt-1">
                  {role ? ROLE_LABELS[role] : ""}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => router.push("/settings")}>
              Profile Settings
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push("/settings/security")}>
              Security
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleSignOut}
              className="text-destructive focus:text-destructive"
            >
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
