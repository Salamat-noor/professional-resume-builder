"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export type Profile = {
  id: string;
  full_name: string | null;
  role: string | null;
  experience_level: string | null;
  onboarding_completed: boolean | null;
  created_at?: string | null;
  updated_at?: string | null;
};

type UpdateProfileInput = Partial<
  Pick<
    Profile,
    "full_name" | "role" | "experience_level" | "onboarding_completed"
  >
>;

export function useProfile() {
  const supabase = useMemo(() => createClient(), []);

  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchProfile = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/user/profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch profile");
      }

      setProfile(data);
      return { data, error: null };
    } catch (err) {
      const finalError =
        err instanceof Error ? err : new Error("Failed to fetch profile");

      setProfile(null);
      setError(finalError);

      return { data: null, error: finalError };
    } finally {
      setLoading(false);
    }
  }, []);

  const updateProfile = useCallback(
    async (values: UpdateProfileInput) => {
      try {
        setUpdating(true);
        setError(null);

        const response = await fetch("/api/user/profile", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to update profile");
        }

        setProfile(data);

        return { data, error: null };
      } catch (err) {
        const finalError =
          err instanceof Error ? err : new Error("Failed to update profile");

        setError(finalError);

        return { data: null, error: finalError };
      } finally {
        setUpdating(false);
      }
    },
    []
  );

  useEffect(() => {
    fetchProfile();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        await fetchProfile();
      } else {
        setProfile(null);
        setLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase, fetchProfile]);

  return {
    profile,
    loading,
    updating,
    error,
    refetchProfile: fetchProfile,
    updateProfile,
  };
}