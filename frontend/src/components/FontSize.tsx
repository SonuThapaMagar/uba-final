import { useState } from 'react';

const FontSize = () => {
    const [fontSize, setFontSize] = useState(40);

    return (
        <div className="w-full max-w-sm bg-[#282A2C] p-4 rounded-lg text-white">
            <label className="block text-sm font-medium text-gray-300 mb-3">Font Size</label>
            <div className="flex items-center gap-4">
                {/* Font Size Display Box */}
                <div className="bg-gray-800/50 text-white px-3 py-1.5 rounded-md flex items-center justify-between w-24 shrink-0">
                    <span className="font-mono">{fontSize}px</span>
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                </div>

                {/* Custom Range Slider */}
                <input
                    type="range"
                    min="8"
                    max="120"
                    value={fontSize}
                    onChange={(e) => setFontSize(Number(e.target.value))}
                    className="w-full h-1.5 bg-gray-600 rounded-full appearance-none cursor-pointer
                     [&::-webkit-slider-thumb]:bg-sky-400
                     [&::-webkit-slider-thumb]:w-5
                     [&::-webkit-slider-thumb]:h-5
                     [&::-webkit-slider-thumb]:rounded-full
                     [&::-webkit-slider-thumb]:appearance-none
                     
                     [&::-moz-range-thumb]:bg-sky-400
                     [&::-moz-range-thumb]:w-5
                     [&::-moz-range-thumb]:h-5
                     [&::-moz-range-thumb]:rounded-full
                     [&::-moz-range-thumb]:border-none"
                />
            </div>
        </div>
    );
};

export default FontSize;