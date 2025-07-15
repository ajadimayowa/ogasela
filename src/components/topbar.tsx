// src/components/Topbar.tsx
import React from 'react';
// import { BsList } from 'react-icons/bs';
import '../styles/topbar.scss';
import { Image } from 'react-bootstrap';

interface TopbarProps {
  toggleSidebar: () => void;
}

const Topbar = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
  return (
    <div className="d-flex justify-content-between shadow-sm align-items-center px-4 py-3 bg-light">
      <i className="bi bi-list d-md-none fs-3" onClick={toggleSidebar}></i>
      {/* <h5 className="m-0">App Name</h5> */}
      <Image src='https://wok9jamedia.s3.eu-north-1.amazonaws.com/bcklogo.jpg' height={24}/>
    </div>
  );
};

export default Topbar;
