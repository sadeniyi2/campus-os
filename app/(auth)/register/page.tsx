"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { GraduationCap, Mail, Lock, User, IdCard, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import type { Role } from "@/types";

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

const ROLES: { value: Role; label: string; description: string }[] = [
  { value: "STUDENT", label: "Student", description: "Access courses, attendance & AI" },
  { value: "LECTURER", label: "Lecturer", description: "Manage courses & students" },
  { value: "COURSE_REP", label: "Course Rep", description: "Manage timetables & announcements" },
];

const DEPARTMENTS = [
  "Computer Science", "Electrical Engineering", "Civil Engineering",
  "Business Administration", "Mathematics", "Mass Communication",
  "Medicine & Surgery", "Law", "Economics",
];

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<Role>("STUDENT");
  const [department, setDepartment] = useState("");
  const [studentId, setStudentId] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const supabase = createClient();
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name, role, department, studentId },
          emailRedirectTo: `${window.location.origin}/auth/confirm?next=/student`,
        },
      });
      if (signUpError) throw signUpError;
      router.push("/verify");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setGoogleLoading(true);
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback?next=/student` },
    });
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-lg">
        <div className="flex items-center gap-3 mb-8 justify-center">
          <div className="flex items-center justify-center size-10 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600">
            <GraduationCap className="size-6 text-white" />
          </div>
          <span className="text-2xl font-bold gradient-text">CampusOS</span>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold">Create your account</h1>
          <p className="text-muted-foreground mt-1">Join your university on CampusOS</p>
        </div>

        <Button
          type="button"
          variant="outline"
          className="w-full gap-3 mb-2 h-11"
          onClick={handleGoogleSignUp}
          loading={googleLoading}
        >
          <GoogleIcon />
          Continue with Google
        </Button>

        <div className="relative my-5">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">or sign up with email</span>
          </div>
        </div>

        <form onSubmit={handleRegister} className="space-y-5">
          {/* Role selector */}
          <div className="space-y-2">
            <Label>I am a...</Label>
            <div className="grid grid-cols-3 gap-2">
              {ROLES.map((r) => (
                <button
                  key={r.value}
                  type="button"
                  onClick={() => setRole(r.value)}
                  className={cn(
                    "flex flex-col items-center p-3 rounded-xl border text-center transition-all",
                    role === r.value
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border hover:border-primary/50 hover:bg-muted/30"
                  )}
                >
                  <p className="text-sm font-semibold">{r.label}</p>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-tight">{r.description}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Full Name</Label>
            <Input
              placeholder="Adebayo Okonkwo"
              value={name}
              onChange={(e) => setName(e.target.value)}
              startIcon={<User className="size-4" />}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>University Email</Label>
            <Input
              type="email"
              placeholder="you@university.edu.ng"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              startIcon={<Mail className="size-4" />}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>{role === "STUDENT" ? "Student ID" : "Staff ID"}</Label>
            <Input
              placeholder={role === "STUDENT" ? "e.g. CSC/2021/001" : "e.g. STAFF/001"}
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              startIcon={<IdCard className="size-4" />}
            />
          </div>

          <div className="space-y-2">
            <Label>Department</Label>
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="flex h-9 w-full rounded-lg border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              <option value="">Select department</option>
              {DEPARTMENTS.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>

          <div className="space-y-2">
            <Label>Password</Label>
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Min. 8 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              startIcon={<Lock className="size-4" />}
              endIcon={
                <button type="button" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              }
              required
              minLength={8}
            />
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
              {error}
            </div>
          )}

          <Button type="submit" variant="gradient" className="w-full h-11" loading={loading}>
            Create Account
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline font-medium">Sign in</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
