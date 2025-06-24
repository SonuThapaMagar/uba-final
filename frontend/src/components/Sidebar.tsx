import { FaFont, FaMoon, FaSun } from "react-icons/fa";
import ColorPicker from "./ColorPicker";
import FontSize from "./FontSize";
import LanguageFilter from "./LanguageFilter";
import { useState } from "react";

export default function Sidebar() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <aside className="bg-[#1B1B1B] text-white w-full md:w-64 h-full flex flex-col py-6 px-4 gap-0 overflow-y-auto flex-shrink-0">
      {/* Sidebar Header */}
      <div className="flex items-center justify-between mb-8">
        {/* Project Name */}
        <div className="flex items-center gap-2">
          <FaFont className="text-2xl" />
          <span className="font-bold text-lg">Type Tester</span>
        </div>

        {/* Theme Toggle Button */}
        <button
          className="text-white text-xl p-2 rounded-full hover:bg-gray-700 transition-colors"
          onClick={() => setDarkMode((prev) => !prev)}
          aria-label="Toggle dark mode"
        >
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-4">
        {/* Divider */}
        <hr className="my-2 border-gray-700" />
        {/* Filters */}
        <div className="flex flex-col gap-4">
          <ColorPicker />
          <FontSize />
          <hr className="my-2 border-gray-700" />
          <LanguageFilter />
        </div>
      </nav>
    </aside>
  );
}
