// src/pages/Dashboard.tsx
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { getAccessibleModules } from '../../../utils/navUtils';
import { useNavigate } from 'react-router-dom';
import './superAdminCreateBranch.scss';
import DecoratedCard from '../../../components/cards/decoratedCard';
import CreateStaffForm from '../../../components/page-forms/CreateStaffForm';
import CreateDepartmentForm from '../../../components/page-forms/CreateDepartmentForm';

const sampleData = [
  { month: 'Jan', value: 100 },
  { month: 'Feb', value: 200 },
  { month: 'Mar', value: 180 },
  { month: 'Apr', value: 250 },
];

const CreateDeptPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const staffProfile = useSelector((state: RootState) => state.auth.staffProfile);
  const orgProfile = useSelector((state: RootState) => state.auth.organisationData);
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
            <h4 className="">New Department.</h4>
            <p>Create a new department.</p>
          </div>
        </div>
      </DecoratedCard>

      <CreateDepartmentForm/>
    </div>
  );
};

export default CreateDeptPage