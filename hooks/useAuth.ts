"use client";

import { useCallback } from "react";
import type { Provider } from "@supabase/supabase-js";

export function useAuth() {
  const signInWithOAuth = useCallback(async (provider: Provider) => {
    try {
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "oauth",
          provider,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        return { error: new Error(data.error) };
      }

      if (data.url) {
        window.location.href = data.url;
      }

      return { data };
    } catch (error) {
      return {
        error:
          error instanceof Error
            ? error
            : new Error("OAuth sign in failed"),
      };
    }
  }, []);

  const signInWithPassword = useCallback(
    async (email: string, password: string) => {
      try {
        const response = await fetch("/api/auth/signin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            type: "password",
            email,
            password,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          return { data: null, error: new Error(data.error) };
        }

        return { data, error: null };
      } catch (error) {
        return {
          data: null,
          error:
            error instanceof Error
              ? error
              : new Error("Sign in failed"),
        };
      }
    },
    []
  );

  const signUp = useCallback(
    async (email: string, password: string, metadata?: object) => {
      try {
        const response = await fetch("/api/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
            metadata,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          return { data: null, error: new Error(data.error) };
        }

        return { data, error: null };
      } catch (error) {
        return {
          data: null,
          error:
            error instanceof Error
              ? error
              : new Error("Sign up failed"),
        };
      }
    },
    []
  );

  const signOut = useCallback(async () => {
    try {
      const response = await fetch("/api/auth/signout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        return { error: new Error(data.error) };
      }

      return { error: null };
    } catch (error) {
      return {
        error:
          error instanceof Error
            ? error
            : new Error("Sign out failed"),
      };
    }
  }, []);

  const resetPassword = useCallback(async (email: string) => {
    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        return { error: new Error(data.error) };
      }

      return { error: null };
    } catch (error) {
      return {
        error:
          error instanceof Error
            ? error
            : new Error("Password reset failed"),
      };
    }
  }, []);

  return {
    signInWithOAuth,
    signInWithPassword,
    signUp,
    signOut,
    resetPassword,
  };
}
