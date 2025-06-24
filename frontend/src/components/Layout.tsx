import { useState, type ReactNode } from 'react';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: ReactNode;
  fontSize: number;
  setFontSize: (size: number) => void;
  selectedLanguages: string[];
  setSelectedLanguages: (languages: string[]) => void;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  fontSize,
  setFontSize,
  selectedLanguages,
  setSelectedLanguages
}) => {
  return (
    <div className="h-screen bg-[#131314] flex flex-col md:flex-row overflow-hidden">
      <Sidebar
        fontSize={fontSize}
        setFontSize={setFontSize}
        selectedLanguages={selectedLanguages}
        setSelectedLanguages={setSelectedLanguages}
      />
      <main className="flex-1 flex flex-col p-4">
        {children}
      </main>
    </div>
  );
};

export default Layout;