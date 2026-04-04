"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

interface LoginFormProps {
  onSwitchMode: () => void;
}

export function LoginForm({ onSwitchMode }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { signInWithPassword } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/dashboard";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error("Please enter both email and password");
      return;
    }

    setIsLoading(true);
    const { error } = await signInWithPassword(email, password);
    setIsLoading(false);

    if (error) {
      toast.error(error.message || "Failed to sign in");
    } else {
      toast.success("Signed in successfully!");
      router.push(redirect);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email address</Label>
        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          className="h-11"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="Enter your password"
          className="h-11"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />
      </div>

      <Button 
        type="submit" 
        className="w-full h-11" 
        size="lg"
        disabled={isLoading}
      >
        {isLoading ? "Signing in..." : "Sign In"}
      </Button>

      <div className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <button
          type="button"
          onClick={onSwitchMode}
          className="text-primary font-medium hover:underline cursor-pointer"
        >
          Create Account
        </button>
      </div>
    </form>
  );
}

export function SocialLoginButtons() {
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const { signInWithOAuth } = useAuth();

  const handleOAuthSignIn = async (provider: 'google' | 'linkedin_oidc') => {
    setIsLoading(provider);
    const { error } = await signInWithOAuth(provider);
    setIsLoading(null);
    
    if (error) {
      toast.error(error.message || `Failed to sign in with ${provider}`);
    }
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-3">
        <Button 
          variant="outline" 
          className="h-11"
          onClick={() => handleOAuthSignIn('google')}
          disabled={isLoading !== null}
        >
          {isLoading === 'google' ? (
            <i className="ri-loader-4-line animate-spin mr-2 text-lg" />
          ) : (
            <i className="ri-google-fill mr-2 text-lg" />
          )}
          Google
        </Button>
        <Button 
          variant="outline" 
          className="h-11"
          onClick={() => handleOAuthSignIn('linkedin_oidc')}
          disabled={isLoading !== null}
        >
          {isLoading === 'linkedin_oidc' ? (
            <i className="ri-loader-4-line animate-spin mr-2 text-lg" />
          ) : (
            <i className="ri-linkedin-box-fill mr-2 text-lg" />
          )}
          LinkedIn
        </Button>
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator className="w-full" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
    </>
  );
}
