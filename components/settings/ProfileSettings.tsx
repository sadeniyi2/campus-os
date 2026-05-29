"use client";

import { useState, useEffect } from "react";
import { Camera, Loader2, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuthStore } from "@/store/useAuthStore";
import { getInitials } from "@/lib/utils";

export function ProfileSettings({ extraFields }: { extraFields?: React.ReactNode }) {
  const { user, setUser } = useAuthStore();
  const [name, setName] = useState(user?.name ?? "");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setName(user?.name ?? "");
  }, [user?.name]);

  const handleSave = async () => {
    if (!name.trim()) return;
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim() }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Failed to save");
      setUser({ ...user!, name: json.data.name, avatarUrl: json.data.avatarUrl });
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold flex items-center gap-2">
          <span className="size-4">👤</span> Profile Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Avatar */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <Avatar className="size-16">
              <AvatarImage src={user?.avatarUrl ?? undefined} />
              <AvatarFallback className="text-lg bg-gradient-to-br from-violet-600 to-indigo-600 text-white">
                {getInitials(user?.name ?? "U")}
              </AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-1 -right-1 flex items-center justify-center size-6 rounded-full bg-primary border-2 border-background text-primary-foreground cursor-pointer">
              <Camera className="size-3" />
            </div>
          </div>
          <div>
            <p className="font-medium text-sm">{user?.name ?? "—"}</p>
            <p className="text-xs text-muted-foreground">{user?.email ?? ""}</p>
            <p className="text-xs text-muted-foreground capitalize mt-0.5">{user?.role?.toLowerCase().replace("_", " ") ?? ""}</p>
          </div>
        </div>

        {/* Name field */}
        <div className="space-y-2">
          <Label>Full Name</Label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your full name"
            onKeyDown={(e) => e.key === "Enter" && handleSave()}
          />
        </div>

        {/* Email — read only */}
        <div className="space-y-2">
          <Label>Email Address</Label>
          <Input value={user?.email ?? ""} disabled className="opacity-60 cursor-not-allowed" />
          <p className="text-xs text-muted-foreground">Email cannot be changed. Contact your administrator.</p>
        </div>

        {/* Extra role-specific fields */}
        {extraFields}

        {error && <p className="text-xs text-red-500">{error}</p>}

        <Button
          onClick={handleSave}
          size="sm"
          disabled={saving || !name.trim()}
          className="gap-2"
        >
          {saving ? (
            <><Loader2 className="size-3.5 animate-spin" /> Saving...</>
          ) : saved ? (
            <><CheckCircle className="size-3.5" /> Saved!</>
          ) : "Save Changes"}
        </Button>
      </CardContent>
    </Card>
  );
}
