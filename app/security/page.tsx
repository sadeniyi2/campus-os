import Link from "next/link";
import { GraduationCap, Shield, Lock, Eye, Server, Key, AlertTriangle } from "lucide-react";

export const metadata = { title: "Security — CampusOS" };

const MEASURES = [
  {
    icon: Lock,
    title: "Encryption in Transit & at Rest",
    desc: "All data is transmitted over TLS 1.3. Database records, including academic data and PII, are encrypted at rest using AES-256 on Supabase (PostgreSQL).",
    color: "bg-violet-100 text-violet-700 dark:bg-violet-950/50 dark:text-violet-400",
  },
  {
    icon: Shield,
    title: "Row-Level Security (RLS)",
    desc: "Every database table enforces Postgres Row-Level Security policies. Students can only access their own records. Lecturers only see data for their assigned courses.",
    color: "bg-blue-100 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400",
  },
  {
    icon: Key,
    title: "Secure Authentication",
    desc: "Authentication is handled by Supabase Auth with PKCE flow. We support email/password and Google OAuth. Passwords are hashed with bcrypt and never stored in plaintext.",
    color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400",
  },
  {
    icon: Eye,
    title: "Audit Logging",
    desc: "All administrative actions — user management, clearance approvals, role changes — are recorded in an immutable audit log with timestamps and actor IDs.",
    color: "bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400",
  },
  {
    icon: Server,
    title: "Infrastructure Security",
    desc: "CampusOS is deployed on Vercel's edge network with DDoS protection and automatic SSL certificates. Database is hosted on Supabase with private networking and IP allowlisting.",
    color: "bg-pink-100 text-pink-700 dark:bg-pink-950/50 dark:text-pink-400",
  },
  {
    icon: AlertTriangle,
    title: "Vulnerability Disclosure",
    desc: "We welcome responsible disclosure of security vulnerabilities. If you discover a security issue, please email security@campus-os.com. We aim to respond within 48 hours.",
    color: "bg-orange-100 text-orange-700 dark:bg-orange-950/50 dark:text-orange-400",
  },
];

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex items-center justify-center size-7 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600">
              <GraduationCap className="size-3.5 text-white" />
            </div>
            <span className="font-bold gradient-text">CampusOS</span>
          </Link>
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">← Back</Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-16 space-y-16">
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center size-16 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 mb-6">
            <Shield className="size-8 text-white" />
          </div>
          <p className="text-primary text-sm font-semibold uppercase tracking-wider mb-3">Trust & Safety</p>
          <h1 className="text-4xl font-bold tracking-tight mb-4">Security at CampusOS</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            We take the security and privacy of your academic data seriously. Here&apos;s how we protect your information at every layer.
          </p>
        </div>

        {/* Security measures grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {MEASURES.map((m) => {
            const Icon = m.icon;
            return (
              <div key={m.title} className="bg-card border border-border rounded-2xl p-6">
                <div className={`inline-flex items-center justify-center size-11 rounded-xl mb-4 ${m.color}`}>
                  <Icon className="size-5" />
                </div>
                <h3 className="font-bold mb-2">{m.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{m.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Compliance banner */}
        <div className="rounded-2xl border border-border bg-muted/30 p-8">
          <h2 className="text-xl font-bold mb-4">Our Commitments</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { label: "Zero Data Selling", desc: "We never sell your personal or academic data to third parties, ever." },
              { label: "No AI Training", desc: "Your AI chat prompts are never used to train or fine-tune AI models." },
              { label: "Right to Erasure", desc: "You can request deletion of your account and data at any time." },
            ].map(({ label, desc }) => (
              <div key={label}>
                <p className="font-semibold text-sm mb-1 text-primary">{label}</p>
                <p className="text-muted-foreground text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Responsible disclosure */}
        <div className="rounded-2xl border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/20 p-8">
          <div className="flex items-start gap-4">
            <AlertTriangle className="size-6 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <h2 className="text-lg font-bold mb-2">Responsible Disclosure</h2>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                Found a security vulnerability? We appreciate responsible disclosure. Please do not publicly disclose the issue until we have had a chance to address it.
              </p>
              <p className="text-sm">
                Email: <strong>security@campus-os.com</strong><br />
                We commit to acknowledging your report within <strong>48 hours</strong> and providing a fix timeline within <strong>14 days</strong> for critical issues.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border flex flex-wrap gap-4 text-sm text-muted-foreground">
          <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
          <Link href="/status" className="hover:text-foreground transition-colors">System Status</Link>
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
        </div>
      </main>
    </div>
  );
}
