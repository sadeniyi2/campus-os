"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, GraduationCap, RefreshCw, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

export default function VerifyPage() {
  const router = useRouter();
  const [resent, setResent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleResend = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setResent(true);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-md text-center">
        <div className="flex items-center justify-center gap-3 mb-12">
          <div className="flex items-center justify-center size-10 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600">
            <GraduationCap className="size-6 text-white" />
          </div>
          <span className="text-2xl font-bold gradient-text">CampusOS</span>
        </div>

        <div className="flex items-center justify-center size-20 rounded-2xl bg-primary/10 mx-auto mb-6">
          <Mail className="size-10 text-primary" />
        </div>

        <h1 className="text-2xl font-bold mb-3">Check your email</h1>
        <p className="text-muted-foreground leading-relaxed mb-8">
          We&apos;ve sent a verification link to your email address. Click the link to activate your CampusOS account.
        </p>

        <div className="bg-muted/50 rounded-xl p-4 mb-6">
          <p className="text-sm text-muted-foreground">
            Didn&apos;t receive the email? Check your spam folder, or click below to resend.
          </p>
        </div>

        {resent ? (
          <div className="flex items-center justify-center gap-2 text-emerald-600 mb-4">
            <CheckCircle className="size-4" />
            <span className="text-sm font-medium">Verification email resent!</span>
          </div>
        ) : (
          <Button
            variant="outline"
            className="w-full gap-2 mb-4"
            onClick={handleResend}
            loading={loading}
          >
            <RefreshCw className="size-4" />
            Resend verification email
          </Button>
        )}

        <Button
          variant="ghost"
          size="sm"
          className="text-muted-foreground"
          onClick={() => router.push("/login")}
        >
          Back to login
        </Button>
      </div>
    </div>
  );
}
