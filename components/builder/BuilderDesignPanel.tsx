"use client";

import { DesignState } from "@/types/builder";



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
    <div className="p-4 space-y-5">
      {/* TEMPLATE */}
      <div>
        <p className="text-xs font-semibold text-gray-700 mb-3">
          Template Style
        </p>
      </div>

      {/* COLOR */}
      <div>
        <p className="text-xs font-semibold text-gray-700 mb-2.5">
          Accent Color
        </p>
        <div className="flex gap-2.5 flex-wrap">
          {palettes.map((p) => (
            <button
              key={p}
              onClick={() => setDesign((prev) => ({ ...prev, color: p }))}
              className={`w-8 h-8 rounded-full transition-transform hover:scale-110 ${
                design.color === p
                  ? "ring-2 ring-offset-2 ring-indigo-500 scale-110"
                  : ""
              }`}
              style={{ backgroundColor: p }}
            />
          ))}
        </div>
      </div>

      {/* FONT */}
      <div>
        <p className="text-xs font-semibold text-gray-700 mb-2">Font Pairing</p>
        <select
          value={design.font}
          onChange={(e) =>
            setDesign((prev) => ({ ...prev, font: e.target.value }))
          }
          className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-xs"
        >
          {fonts.map((font, i) => (
            <option key={i} value={font}>
              {font}
            </option>
          ))}
        </select>
      </div>

      {/* SPACING */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs font-semibold text-gray-700">Content Spacing</p>
          <span className="text-xs text-indigo-600 font-medium">
            {spacingLabels[design.spacing]}
          </span>
        </div>

        <input
          type="range"
          min={0}
          max={2}
          step={1}
          value={design.spacing}
          onChange={(e) =>
            setDesign((prev) => ({
              ...prev,
              spacing: Number(e.target.value) as 0 | 1 | 2,
            }))
          }
          className="w-full accent-indigo-600"
        />
      </div>
    </div>
  );
}