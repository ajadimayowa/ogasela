// src/components/Sidebar.tsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import { persistor, RootState } from '../store/store';
import '../styles/sidebar.scss';
import { getSidebarLinks } from '../utils/navUtils';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar = ({ isOpen, toggleSidebar }: SidebarProps) => {
    const dispatch = useDispatch();
  const role = useSelector((state: RootState) => state.auth.staffProfile?.staffLevel || '');
  // const subscriptionType = useSelector(
  //   (state: RootState) => state.auth.staffProfile?.organization?.subscriptionType || 'basic'
  // );
  const sidebarLinks : any[] = getSidebarLinks(role, 'pro');

  const handleLogout = async () => {
    dispatch(logout());
    await persistor.purge();
    window.location.href = '/login';
  };

  return (
    <div className={`sidebar bg-primary ${isOpen ? 'open' : 'collapsed'}`}>
      <div className="sidebar-header d-flex justify-content-between align-items-center p-3">
        <h4 className="text-white m-0">Admin</h4>
        <i className="bi bi-x text-white d-md-none" onClick={toggleSidebar}></i>
      </div>

      <nav className="sidebar-nav px-2">
        {sidebarLinks.map(({ name, links }) => (
          <div key={name} className="mb-2">
            {name === 'Dashboard' || name === 'Settings' ? (
              <NavLink to={name === 'Dashboard' ? '/' : '/settings'} className="nav-link">
                <i className={`bi ${name === 'Dashboard' ? 'bi-house-door-fill' : 'bi-gear-fill'} me-2`}></i>
                {name}
              </NavLink>
            ) : (
              <>
                <div className="nav-link dropdown-toggle" data-bs-toggle="collapse" data-bs-target={`#${name.replace(/\s+/g, '')}`}>
                  {name}
                </div>
                <div id={name.replace(/\s+/g, '')} className="collapse ps-3">
                  {links.map((link:any)=>(
                    <NavLink to={link.path} key={link.path} className="nav-link small">
                      <i className={`${link.icon || 'bi bi-dot'} me-2`}></i>
                      {link.title}
                    </NavLink>
                  ))}
                </div>
              </>
            )}
          </div>
        ))}

        <button onClick={handleLogout} className="nav-link text-start">
          <i className="bi bi-box-arrow-right me-2"></i> Logout
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;