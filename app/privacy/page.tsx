import Link from "next/link";
import { GraduationCap } from "lucide-react";

export const metadata = { title: "Privacy Policy — CampusOS" };

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="max-w-3xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex items-center justify-center size-7 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600">
              <GraduationCap className="size-3.5 text-white" />
            </div>
            <span className="font-bold gradient-text">CampusOS</span>
          </Link>
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">← Back</Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-16">
        <div className="mb-10">
          <p className="text-primary text-sm font-semibold uppercase tracking-wider mb-2">Legal</p>
          <h1 className="text-4xl font-bold tracking-tight mb-3">Privacy Policy</h1>
          <p className="text-muted-foreground text-sm">Effective date: 1 January 2025 · Last updated: 29 May 2025</p>
        </div>

        <div className="prose prose-sm max-w-none space-y-8 text-foreground">
          <section>
            <h2 className="text-lg font-semibold mb-3">1. Introduction</h2>
            <p className="text-muted-foreground leading-relaxed">
              CampusOS (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) is committed to protecting the personal information of students, lecturers, and administrators who use our platform. This Privacy Policy explains what data we collect, why we collect it, and how it is used and protected.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">2. Data We Collect</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">We collect the following categories of information:</p>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex gap-2"><span className="text-primary font-bold mt-0.5">·</span><span><strong className="text-foreground">Account data:</strong> Name, email address, role (student, lecturer, admin), and institution affiliation.</span></li>
              <li className="flex gap-2"><span className="text-primary font-bold mt-0.5">·</span><span><strong className="text-foreground">Academic data:</strong> Course enrolments, assignment submissions, attendance records, and CGPA.</span></li>
              <li className="flex gap-2"><span className="text-primary font-bold mt-0.5">·</span><span><strong className="text-foreground">Usage data:</strong> Pages visited, features used, session duration, and device/browser information.</span></li>
              <li className="flex gap-2"><span className="text-primary font-bold mt-0.5">·</span><span><strong className="text-foreground">AI chat data:</strong> Prompts sent to the AI Study Assistant. These are not stored permanently and are not used to train models.</span></li>
              <li className="flex gap-2"><span className="text-primary font-bold mt-0.5">·</span><span><strong className="text-foreground">Location data (optional):</strong> GPS coordinates collected via GeoMark only during active attendance sessions, with your explicit consent.</span></li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">3. How We Use Your Data</h2>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex gap-2"><span className="text-primary font-bold mt-0.5">·</span>To provide, operate, and improve the CampusOS platform</li>
              <li className="flex gap-2"><span className="text-primary font-bold mt-0.5">·</span>To send transactional emails (e.g. assignment reminders, clearance updates)</li>
              <li className="flex gap-2"><span className="text-primary font-bold mt-0.5">·</span>To generate academic analytics and performance reports for your institution</li>
              <li className="flex gap-2"><span className="text-primary font-bold mt-0.5">·</span>To ensure platform security and prevent fraudulent activity</li>
              <li className="flex gap-2"><span className="text-primary font-bold mt-0.5">·</span>To comply with applicable laws and regulations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">4. Data Sharing</h2>
            <p className="text-muted-foreground leading-relaxed">
              We do not sell your personal data. We may share data with:
            </p>
            <ul className="space-y-2 text-muted-foreground mt-3">
              <li className="flex gap-2"><span className="text-primary font-bold mt-0.5">·</span><span><strong className="text-foreground">Your institution:</strong> Administrators at your university can access academic records relevant to their role.</span></li>
              <li className="flex gap-2"><span className="text-primary font-bold mt-0.5">·</span><span><strong className="text-foreground">Service providers:</strong> Supabase (database & auth), Vercel (hosting), Google (AI). All are bound by data processing agreements.</span></li>
              <li className="flex gap-2"><span className="text-primary font-bold mt-0.5">·</span><span><strong className="text-foreground">Legal authorities:</strong> When required by law or court order.</span></li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">5. Data Retention</h2>
            <p className="text-muted-foreground leading-relaxed">
              Your account data is retained for as long as your institution maintains an active CampusOS subscription. Upon account deletion, personal data is removed within 30 days. Academic records may be retained for up to 7 years as required by educational regulations.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">6. Your Rights</h2>
            <p className="text-muted-foreground leading-relaxed">You have the right to:</p>
            <ul className="space-y-2 text-muted-foreground mt-3">
              <li className="flex gap-2"><span className="text-primary font-bold mt-0.5">·</span>Access and download a copy of your data</li>
              <li className="flex gap-2"><span className="text-primary font-bold mt-0.5">·</span>Request correction of inaccurate data</li>
              <li className="flex gap-2"><span className="text-primary font-bold mt-0.5">·</span>Request deletion of your account and personal data</li>
              <li className="flex gap-2"><span className="text-primary font-bold mt-0.5">·</span>Object to processing or withdraw consent</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-3">
              To exercise these rights, contact us at <strong className="text-foreground">privacy@campus-os.com</strong>.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">7. Security</h2>
            <p className="text-muted-foreground leading-relaxed">
              We implement industry-standard security measures including TLS encryption, row-level security on all database tables, and regular security audits. See our <Link href="/security" className="text-primary hover:underline">Security page</Link> for full details.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">8. Contact</h2>
            <p className="text-muted-foreground leading-relaxed">
              For privacy-related questions, contact our Data Protection Officer at <strong className="text-foreground">privacy@campus-os.com</strong>.
            </p>
          </section>
        </div>

        <div className="mt-16 pt-8 border-t border-border flex flex-wrap gap-4 text-sm text-muted-foreground">
          <Link href="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
          <Link href="/security" className="hover:text-foreground transition-colors">Security</Link>
          <Link href="/status" className="hover:text-foreground transition-colors">System Status</Link>
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
        </div>
      </main>
    </div>
  );
}
