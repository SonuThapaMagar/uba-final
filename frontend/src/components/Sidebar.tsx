import { FaFont, FaMoon, FaSun, FaRedo } from 'react-icons/fa';
import ColorPicker from './ColorPicker';
import FontSize from './FontSize';
import LanguageFilter from './LanguageFilter';
import { useState } from 'react';

interface SidebarProps {
  fontSize:number;
  setFontSize: (size: number) => void;
  selectedLanguages: string[];
  setSelectedLanguages: (languages: string[]) => void;
  color: string;
  setColor: (color: string) => void;
  colorPickerEnabled: boolean;
  setColorPickerEnabled: (enabled: boolean) => void;
}

export default function Sidebar({ fontSize, setFontSize, selectedLanguages, setSelectedLanguages, color, setColor, colorPickerEnabled, setColorPickerEnabled }: SidebarProps) {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <aside className="bg-[#1B1B1B] text-white w-full md:w-64 h-full flex flex-col py-6 px-4 gap-0 overflow-y-auto flex-shrink-0">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <FaFont className="text-2xl" />
          <span className="font-bold text-lg">Type Tester</span>
        </div>
        <button
          className="text-white text-xl p-2 rounded-full hover:bg-gray-700 transition-colors"
          onClick={() => setDarkMode((prev) => !prev)}
          aria-label="Toggle dark mode"
        >
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>
      </div>
      <button
        className="w-full mb-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
        onClick={() => {
          setFontSize(16);
          setSelectedLanguages([]);
          setColor('#FF7F50');
          setColorPickerEnabled(true);
        }}
        aria-label="Reset all filters"
      >
        <FaRedo className="text-base" />
        Reset All
      </button>
      <button
        className={`w-full mb-2 py-2 ${colorPickerEnabled ? 'bg-green-700 hover:bg-green-600' : 'bg-gray-700 hover:bg-gray-600'} text-white rounded-lg font-semibold transition-colors`}
        onClick={() => setColorPickerEnabled(!colorPickerEnabled)}
        aria-label="Toggle color picker"
      >
        {colorPickerEnabled ? 'Disable Color Picker' : 'Enable Color Picker'}
      </button>
      <nav className="flex flex-col gap-4">
        <hr className="my-2 border-gray-700" />
        <div className="flex flex-col gap-4">
          {colorPickerEnabled && <ColorPicker color={color} setColor={setColor} />}
          <FontSize onFontSizeChange={setFontSize} fontSize={fontSize} />
          <hr className="my-2 border-gray-700" />
          <LanguageFilter selectedLanguages={selectedLanguages} setSelectedLanguages={setSelectedLanguages} />
        </div>
      </nav>
    </aside>
  );
}