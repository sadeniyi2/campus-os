import { create } from "zustand";

interface UIState {
  sidebarCollapsed: boolean;
  commandPaletteOpen: boolean;
  notificationPanelOpen: boolean;
  theme: "light" | "dark" | "system";
  setSidebarCollapsed: (collapsed: boolean) => void;
  toggleSidebar: () => void;
  setCommandPaletteOpen: (open: boolean) => void;
  setNotificationPanelOpen: (open: boolean) => void;
  setTheme: (theme: "light" | "dark" | "system") => void;
}

export const useUIStore = create<UIState>((set) => ({
  sidebarCollapsed: false,
  commandPaletteOpen: false,
  notificationPanelOpen: false,
  theme: "system",

  setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
  toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
  setCommandPaletteOpen: (open) => set({ commandPaletteOpen: open }),
  setNotificationPanelOpen: (open) => set({ notificationPanelOpen: open }),
  setTheme: (theme) => set({ theme }),
}));
