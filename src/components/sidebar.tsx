// src/components/Sidebar.tsx
import React from 'react';
import { NavLink } from 'react-router-dom';
// import { List } from 'react-bootstrap-icons';
import '../styles/sidebar.scss';
import { useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import { persistor } from '../store/store'; // where you setup Redux Persist

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar = ({ isOpen, toggleSidebar }: SidebarProps) => {
  const dispatch = useDispatch()
  const handleLogout = async () => {
    dispatch(logout());
    await persistor.purge(); // Clears localStorage or storage engine
  // Optional: Redirect
  window.location.href = '/login';
    
  }
  return (
    <div className={`bg-primary sidebar`}>
      <div onClick={toggleSidebar} className="sidebar-header d-flex align-items-center justify-content-between p-3">
        <h4 className="m-0">Admin</h4>
        <i className="bi bi-gear-fill me-2"></i>
      </div>

      <nav className="sidebar-nav flex-column">
        <NavLink to="/" className="nav-link">
          <i className="bi bi-house-door-fill me-2"></i> Dashboard
        </NavLink>

        <NavLink to="/users" className="nav-link">
          <i className="bi bi-people-fill me-2"></i> Users
        </NavLink>

        <NavLink to="/settings" className="nav-link">
          <i className="bi bi-gear-fill me-2"></i> Settings
        </NavLink>

        <NavLink to="/reports" className="nav-link">
          <i className="bi bi-graph-up-arrow me-2"></i> Reports
        </NavLink>

        <NavLink onClick={handleLogout} to="/login" className="nav-link">
          <i className="bi bi-graph-up-arrow me-2"></i> Logout
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
