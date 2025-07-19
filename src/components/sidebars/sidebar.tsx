// src/components/Sidebar.tsx
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../features/auth/authSlice';
import { persistor,RootState } from '../../store/store';
import { getSidebarLinks } from '../../utils/navUtils';
import '../styles/sidebar.scss';

// Define SidebarSubLink type if not imported
interface SidebarSubLink {
  path: string;
  title: string;
  icon?: string;
}

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar = ({ isOpen, toggleSidebar }: SidebarProps) => {
  const dispatch = useDispatch();
  const [openModule, setOpenModule] = useState<string | null>(null);

  const role = useSelector((state: RootState) => state.auth.staffProfile?.staffLevel || '');
  const subscriptionType = useSelector(
    (state: RootState) => state.auth.organisationData?.orgSubscriptionPlan || 'basic'
  );
  const sidebarLinks = getSidebarLinks('branch-manager', 'pro');

  const handleLogout = async () => {
    dispatch(logout());
    await persistor.purge();
    window.location.href = '/login';
  };

  const toggleModule = (name: string) => {
    setOpenModule(prev => (prev === name ? null : name));
  };

  return (
    <div className={`sidebar bg-primary ${isOpen ? 'open' : 'collapsed'} col-12  d-absolute bg-light top-0 left-0 h-100  d-lg-block d-md-block col-md-4 col-lg-4`}>
      <div className="sidebar-header d-flex justify-content-between align-items-center p-3">
        <h4 className="text-white m-0">Admin</h4>
        <i className="bi bi-x-circle" onClick={toggleSidebar}></i>
      </div>

      <nav className="sidebar-nav px-2">
        {sidebarLinks.map(({ name, path, links }:any) => (
          <div key={name} className="mb-2">
            {name === 'Dashboard' || name === 'Settings' ? (
              <NavLink to={path || (name === 'Settings' ? '/settings' : '/')} className="nav-link">
                <i className={`bi ${name === 'Dashboard' ? 'bi-house-door-fill' : 'bi-gear-fill'} me-2`}></i>
                {isOpen && name}
              </NavLink>
            ) : (
              <>
                <div
                  className="nav-link d-flex align-items-center"
                  style={{ cursor: 'pointer' }}
                  onClick={() => toggleModule(name)}
                >
                  <i className="bi bi-folder-fill me-2"></i>
                  {isOpen && <span>{name}</span>}
                  {isOpen && (
                    <i className={`ms-auto bi ${openModule === name ? 'bi-chevron-up' : 'bi-chevron-down'}`}></i>
                  )}
                </div>
                {openModule === name && isOpen && (
                    <div className="ps-3">
                    {links.map((link: SidebarSubLink) => (
                      <NavLink to={link.path} key={link.path} className="nav-link small">
                      <i className={`${link.icon || 'bi bi-dot'} me-2`}></i>
                      {link.title}
                      </NavLink>
                    ))}
                    </div>
                )}
              </>
            )}
          </div>
        ))}

        <div onClick={handleLogout} className="nav-link" style={{ cursor: 'pointer' }}>
          <i className="bi bi-box-arrow-right me-2"></i>
          {isOpen && 'Logout'}
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;