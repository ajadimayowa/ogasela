// src/pages/Dashboard.tsx
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { getAccessibleModules } from '../../../utils/navUtils';
import { useNavigate } from 'react-router-dom';
import './superAdminCreateBranch.scss';
import DecoratedCard from '../../../components/cards/decoratedCard';
import CustomButton from '../../../components/custom-button/custom-button';
import ChartCard from '../../../components/chart/ChartCard';
import { Card } from 'react-bootstrap';
import { Formik } from 'formik';
import CustomInput from '../../../components/custom-input/CustormInput';
import ReusableInputs from '../../../components/custom-input/ReusableInputs';
import ReusableDropDownSelect from '../../../components/custom-input/ReusableDropDownSelect';
import CreateDeptModal from '../../../components/modals/super-admin-modals/CreateDeptModal';
import CreateRoleModal from '../../../components/modals/super-admin-modals/CreateRoleModal';

const sampleData = [
  { month: 'Jan', value: 100 },
  { month: 'Feb', value: 200 },
  { month: 'Mar', value: 180 },
  { month: 'Apr', value: 250 },
];

const SuperAdminSettingsPage = () => {
  const navigate = useNavigate();
  const staffProfile = useSelector((state: RootState) => state.auth.staffProfile);
  const modules = getAccessibleModules(
    // staff?.staffLevel || '',
    'marketer',
    // staff?.organization?.subscriptionType || 
    'pro'
  );

  const [departmentModal, setDepartmentModal] = useState(false);
  const [roleModal, setRoleModal] = useState(false);

  const initialValues = {
    nameOfBranch: '',
    branchManager: '',
    branchAddress: ''
  }

  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ];

  return (
    <div className="dashboard-container">
      <DecoratedCard>
        <div className='d-flex flex-wrap justify-content-between w-100'>
          <div>
            <h4 className="">Settings & Prefferance.</h4>
            <p>perform basic customisations and toolings from here.</p>
          </div>
        </div>
      </DecoratedCard>
      <div className='w-100 d-flex flex-wrap'>
        <Card onClick={() => setDepartmentModal(true)} role='button' className='border-0 shadow-sm m-2' style={{ width: '250px' }}>
          <Card.Header className='fw-bold'>
            Department
          </Card.Header>
          <Card.Body>
            <p>Create New department.</p>
          </Card.Body>
        </Card>
        <Card onClick={() => setRoleModal(true)} role='button' className='border-0 shadow-sm m-2' style={{ width: '250px' }}>
          <Card.Header className='fw-bold'>
            Role
          </Card.Header>
          <Card.Body>
            <p>Create new role.</p>
          </Card.Body>
        </Card>

        {/* <Card role='button' className='border-0 shadow-sm m-2' style={{ width: '250px' }}>
          <Card.Header className='fw-bold'>
            Permission
          </Card.Header>
          <Card.Body>
            <p>Create new Permission.</p>
          </Card.Body>
        </Card> */}

        <Card role='button' className='border-0 shadow-sm m-2' style={{ width: '250px' }}>
          <Card.Header className='fw-bold'>
            Intrest Rate
          </Card.Header>
          <Card.Body>
            <p>Set Intrest Rate</p>
          </Card.Body>
        </Card>

        <Card role='button' className='border-0 shadow-sm m-2' style={{ width: '250px' }}>
          <Card.Header className='fw-bold'>
            Penalty fee
          </Card.Header>
          <Card.Body>
            <p>Set penalty fee</p>
          </Card.Body>
        </Card>
      </div>





      <CreateDeptModal
        on={departmentModal}
        off={() => setDepartmentModal(false)}
      />

      <CreateRoleModal
        on={roleModal}
        off={() => setRoleModal(false)}
      />
    </div>
  );
};

export default SuperAdminSettingsPage;