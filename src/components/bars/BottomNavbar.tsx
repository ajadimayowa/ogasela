import React, { useState } from "react";
import { Nav } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";

interface BottomNavbarProps {
  checkAuthStatus: (path: string) => void; // pass the path to parent
}

const BottomNavbar: React.FC<BottomNavbarProps> = ({ checkAuthStatus }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Helper function to handle click
  const handleNavClick = (e: React.MouseEvent, path: string) => {
    e.preventDefault(); // prevent default navigation
    checkAuthStatus(path); // pass the path to parent
  };

  return (
    <div className="d-sm-none fixed-bottom bg-light shadow-lg border-top">
      <Nav className="d-flex justify-content-around py-2">
        <Nav.Link
          href="#home"
          className="text-center"
          onClick={(e) => handleNavClick(e, "/home")}
        >
          <i className="bi bi-house fs-4"></i>
          <div className="small">Home</div>
        </Nav.Link>

        <Nav.Link
          href="/favorites"
          className="text-center"
          onClick={(e) => handleNavClick(e, "/favorites")}
        >
          <i className="bi bi-heart fs-4"></i>
          <div className="small">Favorites</div>
        </Nav.Link>

        <Nav.Link
          href="#sell"
          className="text-center"
          onClick={(e) => handleNavClick(e, "/sell")}
        >
          <i className="bi bi-plus-circle fs-4 text-success"></i>
          <div className="small">Sell</div>
        </Nav.Link>

        <Nav.Link
          href="#messages"
          className="text-center"
          onClick={(e) => handleNavClick(e, "/messages")}
        >
          <i className="bi bi-chat fs-4"></i>
          <div className="small">Messages</div>
        </Nav.Link>

        <Nav.Link
          href="#profile"
          className="text-center"
          onClick={(e) => handleNavClick(e, "/profile")}
        >
          <i className="bi bi-person fs-4"></i>
          <div className="small">Profile</div>
        </Nav.Link>
      </Nav>
    </div>
  );
};

export default BottomNavbar;