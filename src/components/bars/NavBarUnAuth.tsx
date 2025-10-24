import { useState } from "react";
import { Button, Container, Image, Nav, Navbar, Collapse } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import ogaselaLog from "../../assets/images/ogasela-logo.svg";
import CustomButton from "../custom-button/custom-button";

interface ITopBar {
    gotoProfile:()=>void;
    gotToPostAd:()=>void;
}
const NavbarUnAuth:React.FC<ITopBar> = ({gotoProfile,gotToPostAd}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [open, setOpen] = useState(false);

    return (
        <Navbar bg="light" expand="sm" fixed="top" className="shadow-sm">
            <Container>
                {/* Brand / Logo */}
                <Navbar.Brand href="/">
                    <Image src={ogaselaLog} alt="Ogasela Logo" height={32} />
                </Navbar.Brand>

                <div className="d-flex align-items-center gap-2">
                    <a onClick={gotToPostAd} href="#">
                        Post Ad
                    </a>
                    <i onClick={gotoProfile} className="bi bi-person-circle fs-2 text-primary" role="button"></i>

                    {/* <CustomButton
                title=""
                /> */}
                </div>



                {/* <button
                    className="btn border-0 d-sm-none"
                    onClick={() => setOpen(!open)}
                    aria-controls="basic-navbar-nav"
                    aria-expanded={open}
                >
                    <i className="bi bi-list fs-3"></i>
                </button> */}



            </Container>
        </Navbar>
    );
};

export default NavbarUnAuth;