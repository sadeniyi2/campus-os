"use client";

import { useEffect, useState } from "react";
import { GraduationCap, CheckCircle, AlertTriangle, XCircle, RefreshCw, Clock, Zap, Database, Sparkles, MapPin } from "lucide-react";
import Link from "next/link";

type ServiceStatus = {
  status: "ok" | "degraded" | "down";
  latencyMs?: number;
  message?: string;
};

type StatusData = {
  status: "operational" | "degraded" | "down";
  timestamp: string;
  version: string;
  responseMs: number;
  services: {
    database: ServiceStatus;
    ai: ServiceStatus;
    geomark: ServiceStatus;
  };
};

const SERVICE_META = {
  database: { label: "Database", icon: Database, desc: "PostgreSQL via Supabase" },
  ai: { label: "AI Service", icon: Sparkles, desc: "Gemini 2.0 Flash" },
  geomark: { label: "GeoMark Integration", icon: MapPin, desc: "GPS attendance system" },
};

function StatusBadge({ status }: { status: "ok" | "degraded" | "down" | "operational" | "loading" }) {
  if (status === "loading") return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground">
      <span className="size-1.5 rounded-full bg-muted-foreground animate-pulse inline-block" />
      Checking...
    </span>
  );
  if (status === "ok" || status === "operational") return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400">
      <span className="size-1.5 rounded-full bg-emerald-500 inline-block" />
      Operational
    </span>
  );
  if (status === "degraded") return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400">
      <span className="size-1.5 rounded-full bg-amber-500 inline-block" />
      Degraded
    </span>
  );
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700 dark:bg-red-950/50 dark:text-red-400">
      <span className="size-1.5 rounded-full bg-red-500 inline-block" />
      Down
    </span>
  );
}

function ServiceIcon({ status }: { status: "ok" | "degraded" | "down" | "loading" }) {
  if (status === "loading") return <div className="size-5 rounded-full border-2 border-muted-foreground/30 border-t-muted-foreground animate-spin" />;
  if (status === "ok") return <CheckCircle className="size-5 text-emerald-500" />;
  if (status === "degraded") return <AlertTriangle className="size-5 text-amber-500" />;
  return <XCircle className="size-5 text-red-500" />;
}

export default function StatusPage() {
  const [data, setData] = useState<StatusData | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastChecked, setLastChecked] = useState<Date | null>(null);
  const [error, setError] = useState(false);

  const check = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch("/api/status", { cache: "no-store" });
      const json: StatusData = await res.json();
      setData(json);
      setLastChecked(new Date());
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    check();
    const interval = setInterval(check, 30000);
    return () => clearInterval(interval);
  }, []);

  const overall = loading ? "loading" : error ? "down" : data?.status ?? "down";

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <header className="border-b border-border">
        <div className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex items-center justify-center size-7 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600">
              <GraduationCap className="size-3.5 text-white" />
            </div>
            <span className="font-bold gradient-text">CampusOS</span>
          </Link>
          <span className="text-sm text-muted-foreground">System Status</span>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-16 space-y-10">
        {/* Overall status banner */}
        <div className={`rounded-2xl border p-8 text-center transition-colors ${
          overall === "loading" ? "border-border bg-muted/30"
          : overall === "operational" ? "border-emerald-200 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/20"
          : overall === "degraded" ? "border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/20"
          : "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/20"
        }`}>
          <div className="flex items-center justify-center mb-4">
            {overall === "loading" ? (
              <div className="size-12 rounded-full border-4 border-muted-foreground/20 border-t-primary animate-spin" />
            ) : overall === "operational" ? (
              <CheckCircle className="size-12 text-emerald-500" />
            ) : overall === "degraded" ? (
              <AlertTriangle className="size-12 text-amber-500" />
            ) : (
              <XCircle className="size-12 text-red-500" />
            )}
          </div>
          <h1 className="text-2xl font-bold mb-2">
            {overall === "loading" ? "Checking system status..."
            : overall === "operational" ? "All Systems Operational"
            : overall === "degraded" ? "Partial System Degradation"
            : "Service Disruption"}
          </h1>
          <p className="text-muted-foreground text-sm">
            {lastChecked ? `Last checked: ${lastChecked.toLocaleTimeString()}` : "Fetching status..."}
          </p>
        </div>

        {/* Services grid */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Services</h2>
            <button
              onClick={check}
              disabled={loading}
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`size-3.5 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </button>
          </div>
          <div className="space-y-3">
            {Object.entries(SERVICE_META).map(([key, meta]) => {
              const Icon = meta.icon;
              const svc = data?.services[key as keyof typeof data.services];
              const status: "ok" | "degraded" | "down" | "loading" = loading ? "loading" : svc?.status ?? "down";
              return (
                <div key={key} className={`flex items-start gap-4 p-4 rounded-xl border bg-card ${status === "down" ? "border-red-200 dark:border-red-900" : status === "degraded" ? "border-amber-200 dark:border-amber-900" : "border-border"}`}>
                  <div className="flex items-center justify-center size-10 rounded-xl bg-muted shrink-0 mt-0.5">
                    <Icon className="size-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm">{meta.label}</p>
                    <p className={`text-xs mt-0.5 ${status === "down" ? "text-red-600 dark:text-red-400" : status === "degraded" ? "text-amber-600 dark:text-amber-400" : "text-muted-foreground"}`}>
                      {svc?.message ?? meta.desc}
                      {svc?.latencyMs !== undefined && ` · ${svc.latencyMs}ms`}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <ServiceIcon status={status} />
                    <StatusBadge status={status} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Metrics */}
        {data && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[
              { label: "Response Time", value: `${data.responseMs}ms`, icon: Zap },
              { label: "Checked At", value: new Date(data.timestamp).toLocaleTimeString(), icon: Clock },
              { label: "Version", value: `v${data.version}`, icon: GraduationCap },
            ].map(({ label, value, icon: Icon }) => (
              <div key={label} className="p-4 rounded-xl border border-border bg-card text-center">
                <Icon className="size-5 text-muted-foreground mx-auto mb-2" />
                <p className="text-lg font-bold">{value}</p>
                <p className="text-xs text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>
        )}

        <p className="text-center text-xs text-muted-foreground">
          Status page auto-refreshes every 30 seconds. <Link href="/" className="underline hover:text-foreground">Back to homepage</Link>
        </p>
      </main>
    </div>
  );
}
