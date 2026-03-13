import React, { useState } from 'react';
import Sidebar from '../organisms/Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex">
      <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />
      <main className={`flex-1 p-6 transition-all duration-300 ${sidebarOpen ? 'ml-0' : 'ml-0'}`}>
        {children}
      </main>
    </div>
  );
};

export default Layout;