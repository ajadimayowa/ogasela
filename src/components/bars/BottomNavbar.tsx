import { useState } from "react";
import { Button, Container, Image, Nav, Navbar, Collapse } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import ogaselaLog from "../../assets/images/ogasela-logo.svg";

const BottomNavbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [open, setOpen] = useState(false);

    return (
        <div className="d-sm-none fixed-bottom bg-light shadow-lg border-top">
            <Nav className="d-flex justify-content-around py-2">
                {/* Home */}
                <Nav.Link href="#home" className="text-center">
                    <i className="bi bi-house fs-4"></i>
                    <div className="small">Home</div>
                </Nav.Link>
                {/* Favorites */}
                <Nav.Link href="#favorites" className="text-center">
                    <i className="bi bi-heart fs-4"></i>
                    <div className="small">Favorites</div>
                </Nav.Link>
                {/* Sell */}
                <Nav.Link href="#sell" className="text-center">
                    <i className="bi bi-plus-circle fs-4 text-success"></i>
                    <div className="small">Sell</div>
                </Nav.Link>

                {/* Messages */}
                <Nav.Link href="#messages" className="text-center">
                    <i className="bi bi-chat fs-4"></i>
                    <div className="small">Messages</div>
                </Nav.Link>

                {/* Profile */}
                <Nav.Link href="#profile" className="text-center">
                    <i className="bi bi-person fs-4"></i>
                    <div className="small">Profile</div>
                </Nav.Link>
            </Nav>
        </div>
    );
};

export default BottomNavbar;