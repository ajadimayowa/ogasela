// src/pages/Dashboard.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import { getAccessibleModules } from '../../../../utils/navUtils';
import { useNavigate } from 'react-router-dom';
import './superAdminLoandashboard.scss';
import DecoratedCard from '../../../../components/cards/decoratedCard';
import CustomButton from '../../../../components/custom-button/custom-button';
import ChartCard from '../../../../components/chart/ChartCard';

const sampleData = [
  { month: 'Jan', value: 100 },
  { month: 'Feb', value: 200 },
  { month: 'Mar', value: 180 },
  { month: 'Apr', value: 250 },
];

const SuperAdminLoanDashboard = () => {
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
       <div className='d-flex justify-content-between w-100'>
        <div>
           <h4 className="">Welcome, {
          staffProfile?.firstName
          // 'How are you today?'
        }</h4>
        <p>How are you doing today?</p>
        </div>
        <div>
          <div className='d-flex gap-2'>
            <CustomButton title='+ Manager'/>
            <CustomButton className='border bg-light text-dark' title='+ Branch'/>
          </div>
          <a href='#'>Go to Branch Management</a>
        </div>
       </div>
      </DecoratedCard>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <ChartCard
        title="Monthly Loan Performance"
        data={sampleData}
        dataKey="value"
        xKey="month"
        chartType="line"
        color="#4CAF50"
      />

      <ChartCard
        title="Loan Completion Analysis"
        data={sampleData}
        dataKey="value"
        xKey="month"
        chartType="bar"
        color="#2196F3"
      />
    </div>

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

export default SuperAdminLoanDashboard;