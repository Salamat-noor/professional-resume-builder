"use client";

import { DesignState } from "@/types/builder";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

const palettes = [
  "#4F46E5",
  "#0F172A",
  "#059669",
  "#DC2626",
  "#7C3AED",
  "#D97706",
];

const fonts = [
  { value: "Inter", label: "Inter" },
  { value: "Georgia", label: "Georgia" },
  { value: "Geist_Mono", label: "Geist Mono" },
  { value: "Geist", label: "Geist" },
  { value: "Poppins", label: "Poppins" },
  { value: "Merriweather", label: "Merriweather" },
  { value: "Roboto", label: "Roboto" },
  { value: "Pacifico", label: "Pacifico" },
];

const templates = [
  { value: "executive", label: "Executive" },
  { value: "minimal", label: "Minimal" },
  { value: "creative", label: "Creative" },
];

interface Props {
  design: DesignState;
  setDesign: React.Dispatch<React.SetStateAction<DesignState>>;
}

export function BuilderDesignPanel({ design, setDesign }: Props) {
  const spacingLabels = ["Compact", "Balanced", "Spacious"];

  return (
    <div className="p-4 space-y-6">
      {/* TEMPLATE */}
      <div className="space-y-3">
        <Label className="text-xs font-semibold text-foreground">
          Template Style
        </Label>
        <div className="grid grid-cols-3 gap-2">
          {templates.map((t) => (
            <button
              key={t.value}
              onClick={() =>
                setDesign((prev) => ({
                  ...prev,
                  template: t.value as DesignState["template"],
                }))
              }
              className={`aspect-[3/4] rounded-xl border-2 overflow-hidden transition-all ${
                design.template === t.value
                  ? "border-primary ring-2 ring-primary/20"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <div className="h-full p-1.5 flex flex-col">
                <div className="h-2 w-3/4 rounded-full mb-1 bg-foreground"></div>
                <div className="h-1 w-1/2 rounded-full bg-muted-foreground mb-2"></div>
                <div className="flex-1 flex flex-col gap-0.5">
                  <div className="h-0.5 w-full bg-muted"></div>
                  <div className="h-0.5 w-full bg-muted"></div>
                  <div className="h-0.5 w-3/4 bg-muted"></div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* COLOR */}
      <div className="space-y-2.5">
        <Label className="text-xs font-semibold text-foreground">
          Accent Color
        </Label>
        <div className="flex gap-2.5 flex-wrap">
          {palettes.map((p) => (
            <button
              key={p}
              onClick={() => setDesign((prev) => ({ ...prev, color: p }))}
              className={`w-8 h-8 rounded-full transition-transform hover:scale-110 ${
                design.color === p
                  ? "ring-2 ring-offset-2 ring-primary ring-offset-background scale-110"
                  : ""
              }`}
              style={{ backgroundColor: p }}
            />
          ))}
        </div>
      </div>

      {/* FONT */}
      <div className="space-y-2">
        <Label className="text-xs font-semibold text-foreground">
          Font Pairing
        </Label>
        <Select
          value={design.font}
          onValueChange={(value) =>
            setDesign((prev) => ({ ...prev, font: value ?? "Inter" }))
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select font" />
          </SelectTrigger>
          <SelectContent>
            {fonts.map((font) => (
              <SelectItem key={font.value} value={font.value}>
                {font.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* SPACING */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-xs font-semibold text-foreground">
            Content Spacing
          </Label>
          <span className="text-xs text-primary font-medium">
            {spacingLabels[design.spacing]}
          </span>
        </div>
        <Slider
          value={[design.spacing]}
          min={0}
          max={2}
          step={1}
          onValueChange={(values) => {
            const spacing = Array.isArray(values) ? values[0] ?? 1 : values ?? 1;
            setDesign((prev) => ({
              ...prev,
              spacing: spacing as 0 | 1 | 2,
            }));
          }}
          className="w-full"
        />
      </div>
    </div>
  );
}
