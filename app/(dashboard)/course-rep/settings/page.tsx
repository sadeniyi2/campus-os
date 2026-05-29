"use client";

import { useState } from "react";
import { User, Bell, Shield, Palette, Moon, Sun, Monitor } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useAuthStore } from "@/store/useAuthStore";
import { useUIStore } from "@/store/useUIStore";

export default function CourseRepSettingsPage() {
  const { user } = useAuthStore();
  const { theme, setTheme } = useUIStore();
  const [name, setName] = useState(user?.name ?? "");
  const [email] = useState(user?.email ?? "");
  const [level, setLevel] = useState("");
  const [notifications, setNotifications] = useState({
    announcements: true,
    timetable: true,
    system: false,
  });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage your course rep profile and preferences</p>
      </div>

      {/* Profile */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <User className="size-4" /> Profile Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Full Name</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name" />
          </div>
          <div className="space-y-2">
            <Label>Email Address</Label>
            <Input value={email} disabled className="opacity-60 cursor-not-allowed" />
          </div>
          <div className="space-y-2">
            <Label>Level / Class</Label>
            <Input value={level} onChange={(e) => setLevel(e.target.value)} placeholder="e.g. 300 Level, CSC" />
          </div>
          <Button onClick={handleSave} size="sm" variant={saved ? "outline" : "default"}>
            {saved ? "Saved!" : "Save Changes"}
          </Button>
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
            { key: "announcements", label: "Class Announcements", desc: "Replies and reactions to your announcements" },
            { key: "timetable", label: "Timetable Changes", desc: "When changes are made to the class schedule" },
            { key: "system", label: "System Updates", desc: "Platform announcements and updates" },
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
            <p className="text-xs text-muted-foreground">Change your account password</p>
          </div>
          <Button variant="outline" size="sm" asChild>
            <a href="/forgot-password">Reset Password via Email</a>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
