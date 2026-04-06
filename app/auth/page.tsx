"use client";

import { useState, Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { LoginForm, SignupForm, SocialLoginButtons } from "@/components/auth";

function AuthContent() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  useEffect(() => {
    if (error === "oauth_failed") {
      toast.error("OAuth sign in failed. Please try again.");
    }
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-primary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link
            href="/"
            className="font-[var(--font-pacifico)] text-3xl text-primary inline-block"
          >
            ClarityCV
          </Link>
          <p className="text-muted-foreground text-sm mt-2">
            Build resumes that get you hired
          </p>
        </div>

        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">
              {mode === "signup" ? "Create your account" : "Welcome back"}
            </CardTitle>
            <CardDescription>
              {mode === "signup"
                ? "Start building your professional resume today"
                : "Sign in to continue to ClarityCV"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {error === "oauth_failed" && (
              <Alert variant="destructive">
                <AlertDescription>
                  OAuth sign in failed. Please try again or use email/password.
                </AlertDescription>
              </Alert>
            )}
            <SocialLoginButtons />
            {mode === "signin" ? (
              <LoginForm onSwitchMode={() => setMode("signup")} />
            ) : (
              <SignupForm onSwitchMode={() => setMode("signin")} />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function AuthPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-background to-primary/5 flex items-center justify-center p-4">
        <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
      </div>
    }>
      <AuthContent />
    </Suspense>
  );
}
