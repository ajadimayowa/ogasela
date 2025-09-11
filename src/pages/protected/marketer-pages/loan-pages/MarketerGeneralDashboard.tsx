// src/pages/Dashboard.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import { getAccessibleModules } from '../../../../utils/navUtils';
import { useNavigate } from 'react-router-dom';
import './general-dashboard.scss';
import DecoratedCard from '../../../../components/cards/decoratedCard';
import CustomButton from '../../../../components/custom-button/custom-button';
import DashboardDataCard from '../../../../components/cards/DashboardDataCard';
import ChartCard from '../../../../components/chart/ChartCard';

const MarketerLoanDashboardComp = () => {
  const navigate = useNavigate();
  const staffProfile = useSelector((state: RootState) => state.auth.staffProfile);
  const modules = getAccessibleModules(
    // staff?.staffLevel || '',
    'marketer',
    // staff?.organization?.subscriptionType || 
    'pro'
  );

  const cardData = [
    {
      label:'Active Loans',
      value:'256,000.000.00',
      icon1:'bi bi-credit-card',
      icon2:'',
      color:'info'
    },
    {
      label:'Settled Loans',
      value:'256,000.00',
      icon1:'bi bi-person-check',
      icon2:'',
      color:'success'
    },
    {
      label:'Late Repayments',
      value:'256,000.00',
      icon1:'bi bi-exclamation-diamond',
      color:'warning',
      icon2:''
    },
    {
      label:'Bad Loans',
      value:'256,000.00',
      icon1:'bi bi-exclamation-triangle',
      icon2:'',
      color:'danger',
    },
  ]

  const sampleData = [
  { month: 'Jan', value: 100 },
  { month: 'Feb', value: 200 },
  { month: 'Mar', value: 180 },
  { month: 'Apr', value: 250 },
];

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
            <CustomButton onClick={()=>navigate('/marketer/create-loan')} title='New Loan'/>
            {/* <CustomButton onClick={()=>navigate('create-branch')} className='border bg-light text-dark' title='Create Branch'/> */}
          </div>
          <a href='/marketer/loan-management'>Manage Loans</a>
        </div>
       </div>
      </DecoratedCard>

      <div className="module-grid mt-3">
        {cardData.map(module => (
          <DashboardDataCard currency={true}  data={module}/>
        ))}
        {/* <div
          className="module-card bg-secondary text-white"
          onClick={() => navigate('/settings')}
        >
          <i className="bi bi-gear-fill module-icon"></i>
          <h6 className="mt-2">Settings</h6>
        </div> */}
      </div>

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

      
    </div>
  );
};

export default MarketerLoanDashboardComp;
