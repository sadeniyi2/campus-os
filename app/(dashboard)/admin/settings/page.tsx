"use client";

import { useState } from "react";
import { Bell, Shield, Palette, Moon, Sun, Monitor, Building2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ProfileSettings } from "@/components/settings/ProfileSettings";
import { useUIStore } from "@/store/useUIStore";

export default function AdminSettingsPage() {
  const { theme, setTheme } = useUIStore();
  const [universityName, setUniversityName] = useState("");
  const [universityDomain, setUniversityDomain] = useState("");
  const [notifications, setNotifications] = useState({
    newRegistrations: true,
    systemAlerts: true,
    clearanceRequests: true,
    auditLogs: false,
  });

  return (
    <div className="space-y-6 animate-fade-in max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage platform and administrator settings</p>
      </div>

      <ProfileSettings />

      {/* University Settings */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <Building2 className="size-4" /> University Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>University Name</Label>
            <Input value={universityName} onChange={(e) => setUniversityName(e.target.value)} placeholder="e.g. University of Lagos" />
          </div>
          <div className="space-y-2">
            <Label>Student Email Domain</Label>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">@</span>
              <Input value={universityDomain} onChange={(e) => setUniversityDomain(e.target.value)} placeholder="students.unilag.edu.ng" />
            </div>
            <p className="text-xs text-muted-foreground">Students signing up with this domain get verified automatically</p>
          </div>
          <Button size="sm">Save University Config</Button>
        </CardContent>
      </Card>

      {/* Appearance */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <Palette className="size-4" /> Appearance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-muted-foreground mb-3">Choose your preferred theme</p>
          <div className="flex gap-3">
            {(["light", "dark", "system"] as const).map((t) => {
              const Icon = t === "light" ? Sun : t === "dark" ? Moon : Monitor;
              return (
                <button
                  key={t}
                  onClick={() => setTheme(t)}
                  className={`flex-1 flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-colors capitalize text-sm font-medium ${
                    theme === t ? "border-primary bg-primary/5" : "border-border hover:bg-accent"
                  }`}
                >
                  <Icon className="size-5" />
                  {t}
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <Bell className="size-4" /> Notification Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { key: "newRegistrations", label: "New Registrations", desc: "When new users sign up for the platform" },
            { key: "systemAlerts", label: "System Alerts", desc: "Critical system events and errors" },
            { key: "clearanceRequests", label: "Clearance Requests", desc: "When students submit clearance applications" },
            { key: "auditLogs", label: "Audit Log Digest", desc: "Daily summary of admin actions taken" },
          ].map(({ key, label, desc }) => (
            <div key={key} className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium">{label}</p>
                <p className="text-xs text-muted-foreground">{desc}</p>
              </div>
              <Switch
                checked={notifications[key as keyof typeof notifications]}
                onCheckedChange={(v) => setNotifications((n) => ({ ...n, [key]: v }))}
              />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Security */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <Shield className="size-4" /> Security
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <p className="text-sm font-medium">Password</p>
            <p className="text-xs text-muted-foreground">Change your administrator account password</p>
          </div>
          <Button variant="outline" size="sm" asChild>
            <a href="/forgot-password">Reset Password via Email</a>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
