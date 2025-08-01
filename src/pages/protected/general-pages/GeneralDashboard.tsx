// src/pages/Dashboard.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { getAccessibleModules } from '../../../utils/navUtils';
import { useNavigate } from 'react-router-dom';
import './general-dashboard.scss';
import DecoratedCard from '../../../components/cards/decoratedCard';
import CustomButton from '../../../components/custom-button/custom-button';

const GeneralDashboard = () => {
  const navigate = useNavigate();
  const staffProfile = useSelector((state: RootState) => state.auth.staffProfile);
  const modules = getAccessibleModules(
    // staff?.staffLevel || '',
    'marketer',
    // staff?.organization?.subscriptionType || 
    'pro'
  );

  return (
    <div className="dashboard-container">
      <DecoratedCard>
       <div className='d-flex flex-wrap justify-content-between w-100'>
        <div>
           <h4 className="">Welcome, {
          staffProfile?.firstName
          // 'How are you today?'
        }</h4>
        <p>How are you doing today?</p>
        </div>
        <div>
          <div className='d-flex gap-2'>
            <CustomButton onClick={()=>navigate('create-staff')} title='New Staff'/>
            <CustomButton onClick={()=>navigate('create-branch')} className='border bg-light text-dark' title='Create Branch'/>
          </div>
          <a href='#'>Go to Branch Management</a>
        </div>
       </div>
      </DecoratedCard>

      <div className="module-grid mt-3">
        {modules.map(module => (
          <div
            key={module.name}
            className="module-card"
          // onClick={() => navigate(module.path)}
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

export default GeneralDashboard;
