import { useEffect } from 'react';

interface FontCardProps {
  fontFamily: string;
  text: string;
  filePath: string;
  fontSize: number;
}

const FontCard: React.FC<FontCardProps> = ({ fontFamily, text, filePath, fontSize }) => {
  useEffect(() => {
    const fileName = filePath.split(/[\\/]/).pop() || '';
    const fontUrl = `http://localhost:3000/api/fonts/${encodeURIComponent(fileName)}`;
    const style = document.createElement('style');
    style.textContent = `
      @font-face {
        font-family: '${fontFamily}-custom';
        src: url('${fontUrl}') format('truetype');
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, [fontFamily, filePath]);

  return (
    <div className="w-full py-8 border-b border-gray-700 text-white">
      <div className="flex items-baseline gap-4 text-sm text-gray-400 mb-4" style={{ fontFamily: 'sans-serif' }}>
        <h3 className="text-base font-semibold text-white">{fontFamily}</h3>
        <span className="text-xs">Size: {fontSize}px</span>
      </div>
      <p className="text-white" style={{ fontFamily: `${fontFamily}-custom`, fontSize: `${fontSize}px` }}>
        {text || 'Like this'}
      </p>
    </div>
  );
};

export default FontCard;