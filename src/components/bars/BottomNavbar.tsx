import React, { useState } from "react";
import { Nav } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useLocation, useNavigate } from "react-router-dom";

interface BottomNavbarProps {
  checkAuthStatus: (path: string) => void; // pass the path to parent
}

const BottomNavbar: React.FC<BottomNavbarProps> = ({ checkAuthStatus }) => {

    const currentPath = useLocation().pathname
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Helper function to handle click
  const handleNavClick = (e: React.MouseEvent, path: string) => {
    e.preventDefault(); // prevent default navigation
    checkAuthStatus(path); // pass the path to parent
  };

  const navLinks =[
    {
        label:'Home',
        path:'/',
        icon:'bi bi-house'
    },
    {
        label:'Favorites',
        path:'/dashboard/favorites',
        icon:'bi bi-heart'
    },
    {
        label:'Sell',
        path:'/dashboard/post-ad',
        icon:'bi bi-plus-circle'
    },
    {
        label:'Messages',
        path:'/dashboard/messages',
        icon:'bi bi-chat'
    },
    {
        label:'Profile',
        path:'/dashboard/profile',
        icon:'bi bi-person'
    },
]

  return (
    <div className="d-sm-none fixed-bottom bg-light shadow-lg border-top">
      <Nav className="d-flex justify-content-around py-2">
        {
            navLinks.map((link,index)=>(<Nav.Link
          href={link.path}
          className="text-center"
          onClick={(e) => handleNavClick(e, link.path)}
        >
          <i className={`${link.icon}${currentPath===link.path?'-fill':''} fs-4`}></i>
          <div className="small">{link.label}</div>
        </Nav.Link>))
        }
      </Nav>
    </div>
  );
};

export default BottomNavbar;