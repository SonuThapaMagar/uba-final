import type { ReactNode } from 'react';
import Header from './Header';
import Filter from './Filter';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#fff]">
      {/* Header */}
      <Header />

      {/* Filter Section */}
      <Filter/>
    </div>
  );
};

export default Layout;