import { type ReactNode } from 'react';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: ReactNode;
  fontSize: number;
  setFontSize: (size: number) => void;
  selectedLanguages: string[];
  setSelectedLanguages: (languages: string[]) => void;
  color: string;
  setColor: (color: string) => void;
  colorPickerEnabled: boolean;
  setColorPickerEnabled: (enabled: boolean) => void;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  fontSize,
  setFontSize,
  selectedLanguages,
  setSelectedLanguages,
  color,
  setColor,
  colorPickerEnabled,
  setColorPickerEnabled
}) => {
  return (
    <div className="h-screen bg-[#131314] flex flex-col md:flex-row overflow-hidden">
      <Sidebar
        fontSize={fontSize}
        setFontSize={setFontSize}
        selectedLanguages={selectedLanguages}
        setSelectedLanguages={setSelectedLanguages}
        color={color}
        setColor={setColor}
        colorPickerEnabled={colorPickerEnabled}
        setColorPickerEnabled={setColorPickerEnabled}
      />
      <main className="flex-1 flex flex-col p-4">
        {children}
      </main>
    </div>
  );
};

export default Layout;