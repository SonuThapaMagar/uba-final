const FontSize = ({ onFontSizeChange, fontSize }: { onFontSizeChange: (size: number) => void, fontSize: number }) => {
  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const size = parseInt(event.target.value);
    onFontSizeChange(size); 
  };

  return (
    <div className="w-full max-w-xs mx-auto bg-[#282A2C] rounded-xl shadow-md p-4 flex flex-col items-center gap-3">
      <label className="block text-sm font-medium text-gray-200 mb-1">Font Size</label>
      <input
        type="range"
        min="8"
        max="72"
        value={fontSize}
        onChange={handleSliderChange}
        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
      />
      <span className="text-sm text-gray-400">{fontSize}px</span>
    </div>
  );
};

export default FontSize;