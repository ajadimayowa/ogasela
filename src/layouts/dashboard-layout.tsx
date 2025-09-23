// layouts/DashboardLayout.tsx
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/sidebar';
import Topbar from '../components/topbar';
import { useState } from 'react';

interface DashboardLayoutProps {
    // Define any props if needed later (e.g. for toggling sidebar, etc.)
  }

const   DashboardLayout : React.FC<DashboardLayoutProps> = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="d-flex min-vh-100 p-0 m-0">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      <div className="w-100">
        <Topbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        <main style={{overflowY:'scroll', height:'90vh'}} className="p-4">{<Outlet/>}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;