import { useState } from 'react';
import FontCard from './FontCard';

const sampleFonts = [
  'Roboto',
  'Lato',
  'Montserrat',
  'Oswald',
  'Source Code Pro',
  'Raleway',
];

const FontPreviewer = () => {
  const [previewText, setPreviewText] = useState('Type to preview fonts');

  return (
    <div className="w-full h-full text-white flex flex-col">
      {/* Input Field*/}
      <div className="mb-8 flex-shrink-0">
        <input
          type="text"
          value={previewText}
          onChange={(e) => setPreviewText(e.target.value)}
          className="w-full p-4 text-lg bg-gray-800 text-white rounded-lg border-2 border-gray-700 focus:border-sky-500 focus:outline-none"
          placeholder="Type something to preview..."
        />
      </div>

      {/* Vertical Font List*/}
      <div className="flex-grow flex flex-col overflow-y-auto">
        {sampleFonts.map((font) => (
          <FontCard key={font} fontFamily={font} text={previewText} />
        ))}
      </div>
    </div>
  );
};

export default FontPreviewer; 