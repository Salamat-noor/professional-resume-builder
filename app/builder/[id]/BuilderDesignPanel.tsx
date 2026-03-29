'use client';

import { DesignState } from './BuilderWorkspace';

const palettes = ['#4F46E5','#0F172A','#059669','#DC2626','#7C3AED','#D97706'];
const fonts = ['Inter','Georgia','Poppins','Merriweather','Roboto'];

interface Props {
  design: DesignState;
  setDesign: React.Dispatch<React.SetStateAction<DesignState>>;
}

export default function BuilderDesignPanel({ design, setDesign }: Props) {

  const spacingLabels = ['Compact','Balanced','Spacious'];
  const fonts = ['Geist','Geist Mono','Creative'];

  return (
    <div className="p-4 space-y-5">

      {/* TEMPLATE */}
      <div>
        <p className="text-xs font-semibold text-gray-700 mb-3">Template Style</p>
        <div className="grid grid-cols-3 gap-2">
          {(['executive','minimal','creative'] as const).map((t,i) => (
            <button
              key={t}
              onClick={() => setDesign(prev => ({ ...prev, template: t }))}
              className={`aspect-[3/4] rounded-xl border-2 overflow-hidden transition-all ${
                design.template === t
                  ? 'border-indigo-500 ring-2 ring-indigo-100'
                  : 'border-gray-200 hover:border-indigo-200'
              }`}
            >
              <div className="h-full p-1.5">
                <div className="h-2 w-3/4 rounded-full mb-1 bg-gray-800"></div>
                <div className="h-1 w-1/2 rounded-full bg-gray-300 mb-2"></div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* COLOR */}
      <div>
        <p className="text-xs font-semibold text-gray-700 mb-2.5">Accent Color</p>
        <div className="flex gap-2.5 flex-wrap">
          {palettes.map(p => (
            <button
              key={p}
              onClick={() => setDesign(prev => ({ ...prev, color: p }))}
              className={`w-8 h-8 rounded-full transition-transform hover:scale-110 ${
                design.color === p ? 'ring-2 ring-offset-2 ring-indigo-500 scale-110' : ''
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
  onChange={e => setDesign(prev => ({ ...prev, font: e.target.value }))}
  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-xs"
>
  <option value="Geist">Geist (Modern)</option>
  <option value="Geist Mono">Geist Mono (Technical)</option>
  <option value="Creative">Creative (Stylish Header)</option>
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
          onChange={e => 
  setDesign(prev => ({ 
    ...prev, 
    spacing: Number(e.target.value) as 0 | 1 | 2 
  }))
}
          className="w-full accent-indigo-600"
        />
      </div>
    </div>
  );
}