export interface Database {
  public: {
    Tables: {
      resumes: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          content: Record<string, unknown>;
          ats_score: number | null;
          status: "active" | "draft" | "archived";
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          content?: Record<string, unknown>;
          ats_score?: number | null;
          status?: "active" | "draft" | "archived";
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          content?: Record<string, unknown>;
          ats_score?: number | null;
          status?: "active" | "draft" | "archived";
          created_at?: string;
          updated_at?: string;
        };
      };
      users: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          avatar_url: string | null;
          subscription_tier: "free" | "pro" | "enterprise";
          subscription_status: "active" | "cancelled" | "past_due";
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          avatar_url?: string | null;
          subscription_tier?: "free" | "pro" | "enterprise";
          subscription_status?: "active" | "cancelled" | "past_due";
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          subscription_tier?: "free" | "pro" | "enterprise";
          subscription_status?: "active" | "cancelled" | "past_due";
          created_at?: string;
          updated_at?: string;
        };
      };
      job_applications: {
        Row: {
          id: string;
          user_id: string;
          company: string;
          position: string;
          status: "applied" | "screening" | "interview" | "offer" | "rejected";
          applied_at: string;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          company: string;
          position: string;
          status?: "applied" | "screening" | "interview" | "offer" | "rejected";
          applied_at?: string;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          company?: string;
          position?: string;
          status?: "applied" | "screening" | "interview" | "offer" | "rejected";
          applied_at?: string;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}

// Helper types for common queries
export type Resume = Database["public"]["Tables"]["resumes"]["Row"];
export type User = Database["public"]["Tables"]["users"]["Row"];
export type JobApplication = Database["public"]["Tables"]["job_applications"]["Row"];
