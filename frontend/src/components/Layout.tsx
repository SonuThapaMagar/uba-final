import { type ReactNode } from 'react';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: ReactNode;
  fontSize: number;
  setFontSize: (size: number) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, fontSize, setFontSize }) => {
  return (
    <div className="h-screen bg-[#131314] flex flex-col md:flex-row overflow-hidden">
      <Sidebar fontSize={fontSize} setFontSize={setFontSize} />
      <main className="flex-1 flex flex-col p-4">
        {children}
      </main>
    </div>
  );
};

export default Layout;