"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch("/api/auth/user");
        const data = await response.json();

        if (response.ok && data.user) {
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    getUser();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (session?.user) {
          setUser(session.user);
        } else {
          // Refetch user if session changed
          try {
            const response = await fetch("/api/auth/user");
            const data = await response.json();
            setUser(data.user || null);
          } catch (error) {
            console.error("Failed to fetch user:", error);
            setUser(null);
          }
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [supabase]);

  return { user, loading };
}
