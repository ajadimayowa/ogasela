// src/components/Topbar.tsx
import React from 'react';
// import { BsList } from 'react-icons/bs';
import '../../styles/topbar.scss';
import { Image } from 'react-bootstrap';
import CustomButton from '../custom-button/custom-button';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useNavigate } from 'react-router-dom';

interface TopbarProps {
  toggleSidebar: () => void;
}

const StaffTopBar = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
  const navigate= useNavigate()
   const StaffProfile = useSelector((state: RootState) => state.auth.staffProfile);
   const OrgProfile = useSelector((state: RootState) => state.auth.organisationData);
  return (
    <div className="topbar d-flex justify-content-between shadow-sm align-items-center px-4 py-3 bg-light">
      <div className='d-flex gap-2 align-items-center'>
          <i className="sidebar-toggle-button bi bi-list d-md-none fs-3" onClick={toggleSidebar}></i>
        
        <CustomButton
        title='Go Back'
        type='button'
        onClick={()=>navigate(-1)}
        className='border outline bg-light text-dark'

        />|
        <div>
          <p className='p-0 m-0 fw-bold'>{OrgProfile?.nameOfOrg}</p>
          <p className='p-0 m-0 fw-bold text-capitalize'>{StaffProfile?.userClass}</p>
        </div>
      </div>
      <div className='d-flex flex-row align-items-center gap-2'>
         <i className="bi bi-person-circle fs-3"></i>
        <div className=''>
          <p className='p-0 m-0 fw-bold'>{StaffProfile?.fullName}</p>
          <small className='m-0 p-0 text-capitalize'>{StaffProfile?.staffLevel}</small>
        </div>
       
      </div>
      {/* <h5 className="m-0">App Name</h5> */}
      {/* <Image src='https://wok9jamedia.s3.eu-north-1.amazonaws.com/bcklogo.jpg' height={24}/> */}
    </div>
  );
};

export default StaffTopBar;
