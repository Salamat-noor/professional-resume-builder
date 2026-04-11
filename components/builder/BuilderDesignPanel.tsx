"use client";

import { DesignState } from "@/types/builder";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import dynamic from "next/dynamic";

const Slider = dynamic(
  () => import("@/components/ui/slider").then((m) => m.Slider),
  { ssr: false }
)

const palettes = [
  "#4F46E5",
  "#0F172A",
  "#059669",
  "#DC2626",
  "#7C3AED",
  "#D97706",
];
const fonts = [
  "Inter",
  "Georgia",
  "Geist_Mono",
  "Geist",
  "Poppins",
  "Merriweather",
  "Roboto",
  "Pacifico",
];

interface Props {
  design: DesignState;
  setDesign: React.Dispatch<React.SetStateAction<DesignState>>;
}

export function BuilderDesignPanel({ design, setDesign }: Props) {
  const spacingLabels = ["Compact", "Balanced", "Spacious"];

  return (
    <div className="flex flex-col h-full bg-background text-foreground overflow-hidden">
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* TITLE */}
        <div>
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Design Settings</p>
        </div>

        {/* COLOR */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-foreground">Accent Color</p>
            <div className="w-6 h-6 rounded-md border border-border" style={{ backgroundColor: design.color }}></div>
          </div>
          <div className="grid grid-cols-6 gap-2">
            {palettes.map((p) => (
              <button
                key={p}
                onClick={() => setDesign((prev) => ({ ...prev, color: p }))}
                className={`w-full aspect-square rounded-lg transition-all hover:scale-105 border-2 ${
                  design.color === p
                    ? "border-foreground scale-105"
                    : "border-transparent"
                }`}
                style={{ backgroundColor: p }}
                title={p}
              />
            ))}
          </div>
        </div>

        {/* FONT */}
        <div className="space-y-3">
          <p className="text-sm font-semibold text-foreground">Font Pairing</p>
          <Select
            value={design.font}
            onValueChange={(value) =>
              setDesign((prev) => ({ ...prev, font: value || "Inter" }))
            }
          >
            <SelectTrigger className="w-full border-border bg-background text-foreground">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-background border-border">
              {fonts.map((font, i) => (
                <SelectItem key={i} value={font} className="text-foreground">
                  {font}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* SPACING */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-foreground">Content Spacing</p>
            <span className="text-xs font-semibold text-primary px-2 py-1 rounded-md bg-primary/10">
              {spacingLabels[design.spacing]}
            </span>
          </div>

          <Slider
            value={[design.spacing]}
            onValueChange={(value) =>
              setDesign((prev) => ({
                ...prev,
                spacing: (value as number[])[0] as 0 | 1 | 2,
              }))
            }
            min={0}
            max={2}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground px-1">
            <span>Compact</span>
            <span>Balanced</span>
            <span>Spacious</span>
          </div>
        </div>
      </div>
    </div>
  );
}