// src/pages/Dashboard.tsx
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { getAccessibleModules } from '../../../utils/navUtils';
import { useNavigate } from 'react-router-dom';
import './superAdminCreateBranch.scss';
import DecoratedCard from '../../../components/cards/decoratedCard';
import CreateStaffForm from '../../../components/page-forms/CreateStaffForm';
import CreateLoanForm from '../../../components/page-forms/CreateLoanForm';
import { FormSelect } from 'react-bootstrap';

const sampleData = [
  { month: 'Jan', value: 100 },
  { month: 'Feb', value: 200 },
  { month: 'Mar', value: 180 },
  { month: 'Apr', value: 250 },
];

const CreateLoanPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [selectedState,setSelectedState] = useState('');

  const staffProfile = useSelector((state: RootState) => state.auth.staffProfile);
  const orgProfile = useSelector((state: RootState) => state.auth.organisationData);
  const modules = getAccessibleModules(
    // staff?.staffLevel || '',
    'marketer',
    // staff?.organization?.subscriptionType || 
    'pro'
  );

  const handleFormState = ()=>{
    switch (selectedState) {
      case 'lagos': return(<div>Lagos</div>)
        break;
    
      default: return <CreateLoanForm/>
        break;
    }
  }
  
  return (
    <div className="dashboard-container">
      <DecoratedCard>
        <div className='d-flex flex-wrap justify-content-between w-100'>
          <div>
            <h4 className="">New Loan Form.</h4>
            <p>Open a new loan application form here.</p>
          </div>

          <div>
            <label htmlFor=''>Select State</label>
            <FormSelect onChange={(v)=>setSelectedState(v.target.value)}>
              <option>Select</option>
              <option value={'lagos'}>Lagos</option>
            </FormSelect>
          </div>
        </div>
      </DecoratedCard>

      {
        handleFormState()
      }
    </div>
  );
};

export default CreateLoanPage