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
    <div className="d-flex min-vh-100 p-0 m-0">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      <div className="w-100">
        <Topbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        <main style={{overflowY:'scroll', height:'90vh'}} className="p-4">{<Outlet/>}</main>
      </div>
    </div>
  );
};

export default ProtectedRoute;