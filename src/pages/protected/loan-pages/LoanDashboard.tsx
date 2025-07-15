// src/pages/Dashboard.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { getAccessibleModules } from '../../../utils/navUtils';
import { useNavigate } from 'react-router-dom';
import './general-dashboard.scss';

const LoanDashboard = () => {
  const navigate = useNavigate();
  const staff = useSelector((state: RootState) => state.auth.staffProfile);
  const modules = getAccessibleModules(
    // staff?.staffLevel || '',
    'super-admin',
    // staff?.organization?.subscriptionType || 
    'pro'
  );

  return (
    <div className="dashboard-container">
      <h4 className="mb-4">Welcome, {
    //   staff?.fullName
    'Mayowa Ajadi'
      }</h4>
      <div className="module-grid">
        {modules.map(module => (
          <div
            key={module.name}
            className="module-card"
            onClick={() => navigate(module.path)}
          >
            <i className={`${module.icon} module-icon`}></i>
            <h6 className="mt-2">{module.name}</h6>
          </div>
        ))}
        {/* <div
          className="module-card bg-secondary text-white"
          onClick={() => navigate('/settings')}
        >
          <i className="bi bi-gear-fill module-icon"></i>
          <h6 className="mt-2">Settings</h6>
        </div> */}
      </div>
    </div>
  );
};

export default LoanDashboard;
