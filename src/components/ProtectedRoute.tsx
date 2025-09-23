import React, { ReactNode, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { isTokenValid } from '../utils/tokenUtils';
import Sidebar from './sidebar';
import Topbar from './topbar';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<any> = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  if (!isTokenValid()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
  <div className="d-flex p-0 m-0" style={{ height: '100vh', overflow: 'hidden' }}>
    {/* Sidebar */}
    <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

    {/* Right side: Topbar + main */}
    <div className="d-flex flex-column flex-grow-1 w-100">
      {/* Topbar occupies height in flow */}
      <div style={{ height: '60px', flexShrink: 0 }}>
        <Topbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      </div>

      {/* Main content fills the rest */}
      <main
        className="p-3"
        style={{
          flexGrow: 1,
          scrollbarWidth:'none',
          overflowY: 'auto',
          marginTop: '20px',
          marginBottom:'20px'
        }}
      >
        <Outlet />
      </main>
    </div>
  </div>
);
};

export default ProtectedRoute;