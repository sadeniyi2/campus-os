import Link from "next/link";
import { GraduationCap } from "lucide-react";

export const metadata = { title: "Terms of Service — CampusOS" };

export default function TermsPage() {
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
          <h1 className="text-4xl font-bold tracking-tight mb-3">Terms of Service</h1>
          <p className="text-muted-foreground text-sm">Effective date: 1 January 2025 · Last updated: 29 May 2025</p>
        </div>

        <div className="prose prose-sm max-w-none space-y-8 text-foreground">
          <section>
            <h2 className="text-lg font-semibold mb-3">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              By accessing or using CampusOS (&ldquo;the Platform&rdquo;), you agree to be bound by these Terms of Service and our <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>. If you do not agree, you may not use the Platform. These terms apply to all users including students, lecturers, course representatives, and administrators.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">2. Description of Service</h2>
            <p className="text-muted-foreground leading-relaxed">
              CampusOS is a university management platform providing tools for academic record management, attendance tracking via GeoMark integration, timetable management, clearance workflows, announcements, and an AI-powered study assistant. Features may change over time with or without notice.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">3. Accounts and Registration</h2>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex gap-2"><span className="text-primary font-bold mt-0.5">·</span>You must provide accurate and complete information when creating an account.</li>
              <li className="flex gap-2"><span className="text-primary font-bold mt-0.5">·</span>You are responsible for maintaining the confidentiality of your login credentials.</li>
              <li className="flex gap-2"><span className="text-primary font-bold mt-0.5">·</span>You must be at least 16 years old or have parental consent to use the Platform.</li>
              <li className="flex gap-2"><span className="text-primary font-bold mt-0.5">·</span>Accounts are issued per institution. Sharing credentials is strictly prohibited.</li>
              <li className="flex gap-2"><span className="text-primary font-bold mt-0.5">·</span>We reserve the right to suspend or terminate accounts that violate these terms.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">4. Acceptable Use</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">You agree not to:</p>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex gap-2"><span className="text-primary font-bold mt-0.5">·</span>Use the Platform for any unlawful purpose or in violation of university policies</li>
              <li className="flex gap-2"><span className="text-primary font-bold mt-0.5">·</span>Attempt to falsify attendance records, academic data, or clearance statuses</li>
              <li className="flex gap-2"><span className="text-primary font-bold mt-0.5">·</span>Upload malicious files, spam, or harmful content</li>
              <li className="flex gap-2"><span className="text-primary font-bold mt-0.5">·</span>Attempt to access another user&apos;s account or data without authorization</li>
              <li className="flex gap-2"><span className="text-primary font-bold mt-0.5">·</span>Reverse-engineer or attempt to copy any part of the Platform</li>
              <li className="flex gap-2"><span className="text-primary font-bold mt-0.5">·</span>Overload or interfere with Platform infrastructure (e.g. DDoS attacks)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">5. AI Study Assistant</h2>
            <p className="text-muted-foreground leading-relaxed">
              The AI Study Assistant is powered by Google Gemini. AI-generated content is provided for educational assistance only and may contain inaccuracies. You should not rely solely on AI responses for critical academic decisions. Do not submit personally sensitive, confidential, or identifying information to the AI chat.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">6. Intellectual Property</h2>
            <p className="text-muted-foreground leading-relaxed">
              CampusOS and all associated branding, software, and content are the intellectual property of CampusOS Ltd. You are granted a limited, non-exclusive, non-transferable license to use the Platform for its intended academic purpose. Content you submit (course materials, announcements) remains your property; you grant us a license to store and display it within the Platform.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">7. Availability and Service Levels</h2>
            <p className="text-muted-foreground leading-relaxed">
              We aim for 99.9% uptime but do not guarantee uninterrupted access. Scheduled maintenance will be announced in advance where possible. We are not liable for losses arising from service downtime. Check our <Link href="/status" className="text-primary hover:underline">Status page</Link> for real-time availability.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">8. Limitation of Liability</h2>
            <p className="text-muted-foreground leading-relaxed">
              To the maximum extent permitted by applicable law, CampusOS shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the Platform, including loss of data, academic records, or business opportunities.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">9. Changes to Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update these terms at any time. Changes will be communicated via email or in-platform notice. Continued use of the Platform after changes take effect constitutes acceptance of the revised terms.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">10. Governing Law</h2>
            <p className="text-muted-foreground leading-relaxed">
              These terms are governed by the laws of the Federal Republic of Nigeria. Any disputes shall be resolved through the courts of Lagos State, Nigeria.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">11. Contact</h2>
            <p className="text-muted-foreground leading-relaxed">
              For questions about these Terms, email <strong className="text-foreground">legal@campus-os.com</strong>.
            </p>
          </section>
        </div>

        <div className="mt-16 pt-8 border-t border-border flex flex-wrap gap-4 text-sm text-muted-foreground">
          <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
          <Link href="/security" className="hover:text-foreground transition-colors">Security</Link>
          <Link href="/status" className="hover:text-foreground transition-colors">System Status</Link>
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
        </div>
      </main>
    </div>
  );
}
