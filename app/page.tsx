"use client";

import Link from "next/link";
import {
  GraduationCap, MapPin, Sparkles, Calendar, Award, Bell,
  CheckCircle, ArrowRight, ExternalLink, Star, Users, Building2,
  Activity, BookOpen, Shield, Zap, Globe, ChevronRight,
  BarChart2, FileText, Brain,
} from "lucide-react";
import { GEOMARK_URL } from "@/lib/constants";

function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-background/80 backdrop-blur-xl">
      <div className="page-container h-16 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center justify-center size-8 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600">
            <GraduationCap className="size-4 text-white" />
          </div>
          <span className="font-bold text-lg gradient-text">CampusOS</span>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
          <a href="#features" className="hover:text-foreground transition-colors">Features</a>
          <a href="#ai" className="hover:text-foreground transition-colors">AI Tools</a>
          <a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a>
          <a href="#about" className="hover:text-foreground transition-colors">About</a>
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Sign In
          </Link>
          <Link
            href="/register"
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:from-violet-500 hover:to-indigo-500 transition-all"
          >
            Get Started Free
            <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-background via-background to-violet-950/10 pt-16">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />

      <div className="relative page-container py-32 text-center z-10">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-primary font-medium mb-8">
          <Sparkles className="size-3.5" />
          Now with GPT-4o AI Study Assistant
          <ChevronRight className="size-3.5" />
        </div>

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-tight mb-6">
          The Operating System<br />
          <span className="gradient-text">for African Universities</span>
        </h1>

        <p className="max-w-2xl mx-auto text-xl text-muted-foreground leading-relaxed mb-10">
          CampusOS unifies academics, attendance tracking, timetables, clearance workflows, and AI-powered learning into one beautifully designed platform.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link
            href="/register"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-8 py-4 text-base font-semibold text-white shadow-lg hover:from-violet-500 hover:to-indigo-500 transition-all hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.98]"
          >
            Start Free Trial
            <ArrowRight className="size-4" />
          </Link>
          <button
            className="inline-flex items-center gap-2 rounded-xl border border-border px-8 py-4 text-base font-semibold hover:bg-accent transition-colors"
            onClick={() => window.open(GEOMARK_URL, "_blank", "noopener,noreferrer")}
          >
            <MapPin className="size-4 text-primary" />
            See GeoMark Integration
            <ExternalLink className="size-3.5 opacity-60" />
          </button>
        </div>

        {/* Mock dashboard UI */}
        <div className="relative max-w-4xl mx-auto">
          <div className="rounded-2xl border border-border bg-card shadow-2xl overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 bg-muted/50 border-b border-border">
              <div className="flex gap-1.5">
                <div className="size-3 rounded-full bg-red-400" />
                <div className="size-3 rounded-full bg-amber-400" />
                <div className="size-3 rounded-full bg-emerald-400" />
              </div>
              <div className="flex-1 flex items-center justify-center">
                <div className="bg-background rounded-md px-4 py-1 text-xs text-muted-foreground border border-border">
                  campus-os.vercel.app/student
                </div>
              </div>
            </div>
            <div className="p-6 bg-background">
              <div className="grid grid-cols-4 gap-3 mb-4">
                {["CGPA: 4.12", "Attendance: 82%", "Courses: 6", "Pending: 2"].map((stat, i) => (
                  <div key={i} className="bg-card rounded-xl border border-border p-3">
                    <div className="h-1.5 w-12 bg-muted-foreground/20 rounded mb-1.5" />
                    <p className="text-xs font-semibold">{stat}</p>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2 bg-card rounded-xl border border-border p-4">
                  <div className="h-2 w-24 bg-muted-foreground/20 rounded mb-3" />
                  <div className="space-y-2">
                    {["CSC 301 — 91.7%", "CSC 309 — 90.0%", "ENG 301 — 93.8%"].map((c, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="h-1.5 flex-1 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full" style={{ width: `${[92, 90, 94][i]}%` }} />
                        </div>
                        <span className="text-xs text-muted-foreground">{c.split("—")[1]}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-gradient-to-br from-violet-600 to-indigo-700 rounded-xl p-4 text-white">
                  <Sparkles className="size-5 mb-2 opacity-80" />
                  <p className="text-xs font-semibold">AI Assistant</p>
                  <p className="text-xs opacity-70 mt-1">Ask anything about your courses</p>
                </div>
              </div>
            </div>
          </div>
          {/* Glow effect */}
          <div className="absolute -inset-4 bg-gradient-to-r from-violet-600/20 to-indigo-600/20 blur-3xl -z-10 rounded-3xl" />
        </div>
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section className="border-y border-border bg-muted/30">
      <div className="page-container py-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { value: "50+", label: "Universities" },
            { value: "200K+", label: "Students" },
            { value: "99.9%", label: "Uptime" },
            { value: "24/7", label: "Support" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-4xl font-bold gradient-text">{stat.value}</p>
              <p className="text-muted-foreground mt-1 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Problem() {
  return (
    <section className="py-24">
      <div className="page-container">
        <div className="text-center mb-16">
          <p className="text-primary text-sm font-semibold uppercase tracking-wider mb-3">The Problem</p>
          <h2 className="text-4xl font-bold tracking-tight mb-4">University admin is broken</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            African universities are managing critical workflows with scattered tools, paper forms, and manual processes.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: FileText,
              title: "Paper-based clearance",
              desc: "Students queue for days collecting stamps from 5+ departments. Lost forms, missed deadlines, human errors.",
              color: "text-red-500 bg-red-50 dark:bg-red-950/30",
            },
            {
              icon: Calendar,
              title: "Chaotic timetables",
              desc: "Timetables shared via WhatsApp images, constant updates ignored, students missing classes.",
              color: "text-amber-500 bg-amber-50 dark:bg-amber-950/30",
            },
            {
              icon: Users,
              title: "Attendance fraud",
              desc: "Manual sign-in sheets easily forged. No real tracking. Students claiming attendance they didn't attend.",
              color: "text-orange-500 bg-orange-50 dark:bg-orange-950/30",
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="bg-card border border-border rounded-2xl p-6">
                <div className={`inline-flex items-center justify-center size-12 rounded-xl mb-4 ${item.color}`}>
                  <Icon className="size-6" />
                </div>
                <h3 className="font-bold mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Solution() {
  return (
    <section id="features" className="py-24 bg-muted/20">
      <div className="page-container">
        <div className="text-center mb-16">
          <p className="text-primary text-sm font-semibold uppercase tracking-wider mb-3">The Solution</p>
          <h2 className="text-4xl font-bold tracking-tight mb-4">One platform. Every workflow.</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            CampusOS digitizes and streamlines every academic workflow in one unified, beautiful interface.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: MapPin, title: "Smart Attendance", desc: "GPS-verified attendance via GeoMark integration. No more fake sign-ins.", color: "from-violet-500 to-indigo-600" },
            { icon: Calendar, title: "Digital Timetables", desc: "Upload once, access everywhere. PDF, image, and document support.", color: "from-blue-500 to-cyan-600" },
            { icon: Award, title: "Digital Clearance", desc: "5-module digital clearance with QR certificates and real-time tracking.", color: "from-emerald-500 to-teal-600" },
            { icon: Sparkles, title: "AI Study Assistant", desc: "GPT-4o powered assistant for quizzes, flashcards, and study plans.", color: "from-pink-500 to-rose-600" },
            { icon: Bell, title: "Announcements", desc: "Twitter-style announcement feed with reactions, comments and real-time updates.", color: "from-amber-500 to-orange-600" },
            { icon: BarChart2, title: "Academic Analytics", desc: "CGPA tracking, performance insights, and exam eligibility status.", color: "from-purple-500 to-violet-600" },
          ].map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} className="bg-card border border-border rounded-2xl p-6 card-hover">
                <div className={`inline-flex items-center justify-center size-11 rounded-xl bg-gradient-to-br ${feature.color} mb-4`}>
                  <Icon className="size-5 text-white" />
                </div>
                <h3 className="font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function GeoMarkSection() {
  return (
    <section className="py-24">
      <div className="page-container">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 via-indigo-600 to-purple-700 p-12 text-white">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-sm font-medium mb-6">
                <MapPin className="size-4" />
                Powered by GeoMark
              </div>
              <h2 className="text-4xl font-bold mb-4">GPS-Verified Attendance</h2>
              <p className="text-white/80 text-lg leading-relaxed mb-8">
                CampusOS integrates seamlessly with GeoMark — the leading GPS-based attendance system. Students and lecturers can mark and view attendance with one click, right from CampusOS.
              </p>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => window.open(GEOMARK_URL, "_blank", "noopener,noreferrer")}
                  className="inline-flex items-center gap-2 rounded-xl bg-white text-violet-700 px-6 py-3 font-semibold hover:bg-white/90 transition-colors"
                >
                  Open GeoMark <ExternalLink className="size-4" />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Mark Attendance", icon: CheckCircle, desc: "One-tap GPS check-in" },
                { label: "View Records", icon: BarChart2, desc: "Full attendance history" },
                { label: "Analytics", icon: Activity, desc: "Attendance trends" },
                { label: "Alerts", icon: Bell, desc: "Low attendance warnings" },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="bg-white/10 rounded-xl p-4">
                    <Icon className="size-6 mb-2 text-white/80" />
                    <p className="font-semibold text-sm">{item.label}</p>
                    <p className="text-white/60 text-xs mt-0.5">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
          {/* Decorative */}
          <div className="absolute -top-24 -right-24 size-64 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute -bottom-12 -left-12 size-48 rounded-full bg-white/5 blur-2xl" />
        </div>
      </div>
    </section>
  );
}

function AISection() {
  return (
    <section id="ai" className="py-24 bg-muted/20">
      <div className="page-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-primary text-sm font-semibold uppercase tracking-wider mb-3">AI Learning</p>
            <h2 className="text-4xl font-bold tracking-tight mb-6">
              Study smarter with<br />
              <span className="gradient-text">CampusAI</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Powered by GPT-4o, CampusAI understands your courses and helps you study more effectively than ever before.
            </p>
            <div className="space-y-4">
              {[
                { icon: Brain, title: "Quiz Generator", desc: "Auto-generate MCQ tests for any topic or course" },
                { icon: Zap, title: "Flashcard Creator", desc: "Build and review flashcard decks with spaced repetition" },
                { icon: FileText, title: "Lecture Summarizer", desc: "Paste lecture notes and get structured summaries instantly" },
                { icon: Sparkles, title: "Study Planner", desc: "AI-generated semester study plans based on your exam dates" },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="flex items-start gap-3">
                    <div className="flex items-center justify-center size-8 rounded-lg bg-primary/10 shrink-0 mt-0.5">
                      <Icon className="size-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{item.title}</p>
                      <p className="text-muted-foreground text-sm">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-xl">
            <div className="bg-gradient-to-br from-violet-600 to-indigo-700 p-4">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center size-7 rounded-lg bg-white/20">
                  <Sparkles className="size-4 text-white" />
                </div>
                <p className="text-white font-semibold text-sm">CampusAI</p>
                <div className="ml-auto flex items-center gap-1">
                  <div className="size-1.5 rounded-full bg-emerald-400" />
                  <span className="text-white/70 text-xs">Online</span>
                </div>
              </div>
            </div>
            <div className="p-5 space-y-3">
              <div className="bg-muted rounded-xl rounded-tl-sm p-3 max-w-[85%]">
                <p className="text-sm">Hello! I can help you study for your CSC 301 exam. What would you like to practice?</p>
              </div>
              <div className="bg-primary text-primary-foreground rounded-xl rounded-tr-sm p-3 max-w-[85%] ml-auto">
                <p className="text-sm">Generate 5 MCQ questions on binary search trees</p>
              </div>
              <div className="bg-muted rounded-xl rounded-tl-sm p-3 max-w-[95%]">
                <p className="text-sm font-medium mb-1">Quiz: Binary Search Trees</p>
                <div className="space-y-1.5">
                  <p className="text-xs text-muted-foreground">Q1. What is the time complexity for searching in a balanced BST?</p>
                  {["O(n)", "O(log n) ✓", "O(n²)", "O(1)"].map((opt, i) => (
                    <div key={i} className={`text-xs px-2 py-1 rounded ${i === 1 ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400 font-medium" : "opacity-60"}`}>{opt}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ClearanceSection() {
  return (
    <section className="py-24">
      <div className="page-container">
        <div className="text-center mb-16">
          <p className="text-primary text-sm font-semibold uppercase tracking-wider mb-3">Digital Clearance</p>
          <h2 className="text-4xl font-bold tracking-tight mb-4">From 5 days to 5 minutes</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Replace paper stampings with a digital workflow. Track all clearance modules in real-time from your phone.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-start justify-center gap-4">
          {["Bursary", "Library", "Medical", "Hostel", "Department"].map((module, i) => (
            <div key={module} className="flex flex-col items-center">
              <div className={`flex items-center justify-center size-14 rounded-2xl border-2 font-bold text-lg ${i < 2 ? "border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400" : "border-muted bg-muted/50 text-muted-foreground"}`}>
                {i < 2 ? <CheckCircle className="size-6 text-emerald-500" /> : <span className="text-2xl">{["💰", "📚", "🏥", "🏠", "🎓"][i]}</span>}
              </div>
              <p className="text-sm font-medium mt-2">{module}</p>
              <p className="text-xs text-muted-foreground">{i < 2 ? "Approved" : "Pending"}</p>
              {i < 4 && (
                <div className="hidden sm:block absolute h-0.5 w-8 bg-border translate-x-20 mt-7" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="py-24 bg-muted/20">
      <div className="page-container">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight mb-4">Loved by students & staff</h2>
          <p className="text-muted-foreground text-lg">Hear from universities already using CampusOS</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: "Adebayo Okonkwo", role: "300L Computer Science, UNILAG", quote: "CampusOS completely changed how I manage my academics. The AI study assistant helped me ace my Data Structures exam with custom quizzes.", avatar: "AO" },
            { name: "Dr. Amaka Nwosu", role: "Lecturer, University of Ibadan", quote: "Posting announcements and managing assignments has never been easier. My students always stay informed, and attendance tracking is seamless.", avatar: "AN" },
            { name: "Ibrahim Musa", role: "Admin, ABU Zaria", quote: "We reduced clearance processing time from a week to under 24 hours. The digital workflow is transparent and our students love it.", avatar: "IM" },
          ].map((t) => (
            <div key={t.name} className="bg-card border border-border rounded-2xl p-6">
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-4 text-amber-500 fill-current" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5 italic">&ldquo;{t.quote}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center size-9 rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 text-white text-sm font-bold">
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const plans = [
    {
      name: "Starter",
      price: { monthly: "$0", yearly: "$0" },
      desc: "Perfect for small departments",
      features: ["Up to 500 students", "Basic announcements", "Timetable uploads", "Email support"],
      cta: "Get Started Free",
      highlighted: false,
    },
    {
      name: "Pro",
      price: { monthly: "$49", yearly: "$39" },
      desc: "Full platform for growing universities",
      features: ["Up to 5,000 students", "AI Study Assistant", "GeoMark integration", "Clearance workflows", "Analytics dashboard", "Priority support"],
      cta: "Start Free Trial",
      highlighted: true,
    },
    {
      name: "Enterprise",
      price: { monthly: "Custom", yearly: "Custom" },
      desc: "For large institutions",
      features: ["Unlimited students", "Custom integrations", "SSO & LDAP", "Dedicated support", "SLA guarantee", "White-label option"],
      cta: "Contact Sales",
      highlighted: false,
    },
  ];

  return (
    <section id="pricing" className="py-24">
      <div className="page-container">
        <div className="text-center mb-16">
          <p className="text-primary text-sm font-semibold uppercase tracking-wider mb-3">Pricing</p>
          <h2 className="text-4xl font-bold tracking-tight mb-4">Simple, transparent pricing</h2>
          <p className="text-muted-foreground text-lg">Start free, scale as you grow</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl border p-6 relative ${plan.highlighted ? "border-primary bg-gradient-to-b from-primary/5 to-background shadow-lg shadow-primary/10" : "border-border bg-card"}`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs text-primary-foreground font-semibold">
                  Most Popular
                </div>
              )}
              <p className="font-bold text-lg mb-1">{plan.name}</p>
              <p className="text-3xl font-bold mb-1">{plan.price.monthly}</p>
              <p className="text-muted-foreground text-sm mb-5">{plan.desc}</p>
              <ul className="space-y-2.5 mb-6">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="size-4 text-primary shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/register"
                className={`block text-center rounded-xl py-2.5 text-sm font-semibold transition-all ${plan.highlighted ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:from-violet-500 hover:to-indigo-500" : "border border-border hover:bg-accent"}`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="py-24 bg-gradient-to-br from-violet-600 via-indigo-600 to-purple-700 relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:3rem_3rem]" />
      <div className="relative page-container text-center text-white">
        <h2 className="text-4xl sm:text-5xl font-bold mb-6">
          Ready to modernize your university?
        </h2>
        <p className="text-white/80 text-xl mb-10 max-w-2xl mx-auto">
          Join 50+ African universities already transforming their operations with CampusOS.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/register"
            className="inline-flex items-center gap-2 rounded-xl bg-white text-violet-700 px-8 py-4 text-base font-semibold hover:bg-white/90 transition-colors shadow-lg"
          >
            Start Free Trial
            <ArrowRight className="size-4" />
          </Link>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 rounded-xl border border-white/30 text-white px-8 py-4 text-base font-semibold hover:bg-white/10 transition-colors"
          >
            Sign In
          </Link>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="page-container py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center justify-center size-8 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600">
                <GraduationCap className="size-4 text-white" />
              </div>
              <span className="font-bold gradient-text">CampusOS</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              The unified operating system for African universities. Built with love for the continent.
            </p>
          </div>
          {[
            { heading: "Product", links: ["Features", "Pricing", "AI Tools", "GeoMark Integration"] },
            { heading: "University", links: ["Students", "Lecturers", "Administrators", "Course Reps"] },
            { heading: "Company", links: ["About", "Blog", "Careers", "Contact"] },
          ].map((col) => (
            <div key={col.heading}>
              <p className="font-semibold text-sm mb-3">{col.heading}</p>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-border mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">© 2025 CampusOS. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground">Privacy</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground">Terms</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground">Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Stats />
      <Problem />
      <Solution />
      <GeoMarkSection />
      <AISection />
      <ClearanceSection />
      <Testimonials />
      <Pricing />
      <CTA />
      <Footer />
    </div>
  );
}
