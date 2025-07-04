import { useState, useEffect } from 'react';
import FontCard from './FontCard';

interface FontPreviewerProps {
  fontSize: number;
}

const FontPreviewer: React.FC<FontPreviewerProps> = ({ fontSize }) => {
  const [previewText, setPreviewText] = useState('Type to preview fonts');
  const [fonts, setFonts] = useState<{ id: number; name: string; filePath: string; fontSize: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFonts = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/fonts');
        if (!response.ok) throw new Error('Failed to fetch fonts');
        const data = await response.json();
        setFonts(data);
      } catch (err) {
        setError('Error loading fonts. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchFonts();
  }, []);

  if (loading) return <div className="text-white">Loading fonts...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="w-full h-full text-white flex flex-col">
      {/* Input Field */}
      <div className="mb-8 flex-shrink-0">
        <input
          type="text"
          value={previewText}
          onChange={(e) => setPreviewText(e.target.value)}
          className="w-full p-4 text-lg bg-gray-800 text-white rounded-lg border-2 border-gray-700 focus:border-sky-500 focus:outline-none"
          placeholder="Type something to preview..."
        />
      </div>
      {/* Vertical Font List */}
      <div className="flex-grow flex flex-col overflow-y-auto">
        {fonts.map((font) => (
          <FontCard
            key={font.id}
            fontFamily={font.name}
            text={previewText}
            filePath={font.filePath}
            fontSize={fontSize}
          />
        ))}
      </div>
    </div>
  );
};

export default FontPreviewer;