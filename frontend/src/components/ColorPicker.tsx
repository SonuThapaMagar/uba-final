import React from "react";

interface ColorPickerProps {
  color: string;
  setColor: (color: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ color, setColor }) => {
  return (
    <div className="w-full max-w-xs mx-auto bg-[#282A2C] rounded-xl shadow-md p-4 flex flex-col items-center gap-3">
      <label className="block text-sm font-medium text-gray-200 mb-1">Pick a Color</label>

      <div className="relative w-16 h-16">
        {/* Circular color preview */}
        <label
          htmlFor="color-input"
          className="block w-full h-full rounded-full cursor-pointer border-2 border-gray-500"
          style={{ backgroundColor: color }}
          aria-label="Current color"
        />
        
        <input
          id="color-input"
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
      </div>

      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-400">Selected:</span>
        <span className="font-mono text-sm" style={{ color }}>{color}</span>
        <span className="inline-block w-4 h-4 rounded-full border border-gray-300" style={{ backgroundColor: color }}></span>
      </div>
    </div>
  );
};

export default ColorPicker;