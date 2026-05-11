import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();

    const { role, experience_level, full_name } = body;

    if (!role || !experience_level || !full_name) {
      return NextResponse.json(
        {
          error: "role, experience_level and full_name are required",
        },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("profiles")
      .upsert(
        {
          id: user.id,
          role,
          experience_level,
          full_name,
          onboarding_completed: true,
          updated_at: new Date().toISOString(),
        },
        {
          onConflict: "id",
        }
      )
      .select()
      .single();

    if (error) {
      console.error("Onboarding profile error:", error);

      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      profile: data,
    });
  } catch (err) {
    console.error("Onboarding API error:", err);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}