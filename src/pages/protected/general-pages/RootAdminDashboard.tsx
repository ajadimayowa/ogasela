// src/pages/Dashboard.tsx
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { getAccessibleModules } from '../../../utils/navUtils';
import { useNavigate } from 'react-router-dom';
import './rootAdmin-dashboard.scss';
import DecoratedCard from '../../../components/cards/decoratedCard';
import CustomButton from '../../../components/custom-button/custom-button';
import OrganisationForm from '../../../components/page-forms/OrganisationForm';
import DepartmentForm from '../../../components/page-forms/AdminDepartmentForm';
import AdminDepartmentForm from '../../../components/page-forms/AdminDepartmentForm';
import SuperAdminRoleForm from '../../../components/page-forms/SuperAdminRoleForm';
import SuperAdminStaffForm from '../../../components/page-forms/SuperAdminStaffForm';
import { on } from 'events';


const RootAdminDashboard = () => {
  const navigate = useNavigate();
  const adminProfile = useSelector((state: RootState) => state.auth.rootAdminProfile);
  const [formNumber,setFormNumber] = useState(0);
  const modules = [
    {
      id:0,
      name: 'Organization',
      icon: 'bi bi-bank2',
      onClick: () => {
        setFormNumber(0);
      }
    },
    {
      id:1,
      name: 'Admin Department',
      icon: 'bi bi-building',
       onClick: () => {
        setFormNumber(1);
      }
    },
    {
      id:2,
      name: 'Admin Role',
      icon: 'bi bi-briefcase',
      onClick: () => {
        setFormNumber(2);
      }
    },
    {
      id:3,
      name: 'Super Admin',
      icon: 'bi bi-person-plus',
      onClick: () => {
        setFormNumber(3);
      }
    }
  ]

  const screens = [
    <OrganisationForm/>,
    <AdminDepartmentForm/>,
    <SuperAdminRoleForm/>,
    <SuperAdminStaffForm/>,
  ]

  return (
    <div className="dashboard-container">
      <DecoratedCard>
       <div className='d-flex flex-wrap justify-content-between w-100'>
        <div>
           <h4 className="">Welcome, {
          adminProfile?.firstName
          // 'How are you today?'
        }</h4>
        <p>How are you doing today?</p>
        </div>
        <div>
          {/* <div className='d-flex gap-2'>
            <CustomButton 
            style={{width:'150px'}}
            onClick={()=>navigate('create-staff')} title='New Staff'/>
            <CustomButton onClick={()=>navigate('create-branch')} className='border bg-light text-dark' title='Create Branch'/>
          </div>
          <a href='super-admin/branch-management'>Go to Branch Management</a> */}
        </div>
       </div>
      </DecoratedCard>

      <div className="module-grid mt-3">
        {modules.map(module => (
          <div
            key={module.name}
            className="module-card"
          onClick={() => module.onClick()}
          >
            <div className='w-100 text-end p-0 m-0'>
              {
                module.id==formNumber &&
                <i className="bi bi-app-indicator"></i>}
            </div>
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

      <div className='mt-2'>
        {
          screens[formNumber]
        }
      </div>

      
    </div>
  );
};

export default RootAdminDashboard;
