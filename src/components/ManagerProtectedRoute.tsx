import React, { ReactNode, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { isTokenValid } from '../utils/tokenUtils';
import Sidebar from './sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { logout } from '../features/auth/authSlice';
import { persistor } from '../store/store'; // where you setup Redux Persist
import SuperAdminSidebar from './sidebars/super-admin-sidebar';
import { toast } from 'react-toastify';
import SuperAdminTopbar from './bars/SuperAdminTopBar';
import StaffTopBar from './bars/StaffTopBar';
import MarketerSidebar from './sidebars/marketer-sidebar';
import ManagerSidebar from './sidebars/manager-sidebar';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ManagerProtectedRoute: React.FC<any> = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();
   const staffProfile = useSelector((state: RootState) => state.auth.staffProfile);
  const dispatch = useDispatch();
  const token = useSelector((state:RootState) => state.auth.token);


  if (
  !token ||
  (staffProfile?.staffLevel !== 'branch-manager' &&
   staffProfile?.staffLevel !== 'approver')
) {
  dispatch(logout());
  persistor.purge();
  return <Navigate to="/login" replace />;
}

  return (
  <div className="d-flex p-0 m-0" style={{ height: '100vh'}}>
    {/* Sidebar */}
    <ManagerSidebar
    isOpen={isSidebarOpen} 
    toggleSidbar={()=>setIsSidebarOpen(!isSidebarOpen)} 
    />

    {/* Right side: Topbar + main */}
    <div className="d-flex flex-column flex-grow-1 w-100">
      {/* Topbar occupies height in flow */}
      <div style={{ height: '60px', flexShrink: 0 }}>
        <StaffTopBar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      </div>

      {/* Main content fills the rest */}
      <main
        className="p-3"
        style={{
          flexGrow: 1,
          scrollbarWidth:'none',
          overflowY: 'auto',
          marginTop: '20px',
          marginBottom:'20px',
        }}
      >
        <Outlet />
      </main>
    </div>
  </div>
);
};

export default ManagerProtectedRoute;