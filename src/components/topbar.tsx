// src/components/Topbar.tsx
import React from 'react';
// import { BsList } from 'react-icons/bs';
import '../styles/topbar.scss';

interface TopbarProps {
  toggleSidebar: () => void;
}

const Topbar = ({ toggleSidebar }: TopbarProps) => {
  return (
    <nav className="topbar d-flex align-items-center justify-content-between px-3 py-2 shadow-sm">
      <div className="d-flex align-items-center">
        <i className="bi bi-gear-fill me-2" onClick={toggleSidebar}></i>
        <h5 className="m-0">Admin Portal</h5>
      </div>

      <div className="d-flex align-items-center">
        <div className="user-info d-flex align-items-center">
          <img
            src="https://via.placeholder.com/40"
            alt="Profile"
            className="rounded-circle me-2"
            width="40"
            height="40"
          />
          <span>Admin</span>
        </div>
      </div>
    </nav>
  );
};

export default Topbar;
