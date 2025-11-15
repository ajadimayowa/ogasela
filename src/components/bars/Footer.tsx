import { useState } from "react";
import './footer.scss'
import { Button, Container, Image, Nav, Navbar, Collapse, Row, Col } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import ogaselaLog from "../../assets/images/ogasela-logo.svg";
import CustomButton from "../custom-button/custom-button";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

interface ITopBar {
    gotoProfile: () => void;
    gotToPostAd: () => void;
}
const Footer: React.FC<ITopBar> = ({ gotoProfile, gotToPostAd }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [open, setOpen] = useState(false);
    const userProfile = useSelector((user: RootState) => user.auth.userProfile)
    const donationUrl = process.env.REACT_APP_DONATION

    return (
        <Container fluid className="footer-container bg-primary text-light p-5" style={{minHeight:'350px'}}>
            <Row className="text-light">
                <Col className="">
                <div>
                    <p className="text-light fw-bold">About us</p>
                    <ul className="m-0 p-0" style={{listStyle:'none'}}>
                        <li className="p-2"><a href="#" className="text-light link-info text-decoration-none">Who we are</a></li>
                        <li className="p-2"><a href="#" className="text-light link-info text-decoration-none">Terms & Conditions</a></li>
                        <li className="p-2"><a href="#" className="text-light link-info text-decoration-none">Privacy Policy</a></li>
                        <li className="p-2"><a href="#" className="text-light link-info text-decoration-none">Cookie Policy</a></li>
                           
                    </ul>
                </div>
                </Col>
                <Col className="">
                <div>
                    <p className="text-light fw-bold">Support</p>
                    <ul className="m-0 p-0" style={{listStyle:'none'}}>
                        <li className="p-2"><a href="#" className="text-light link-info text-decoration-none">support@ogasela.com</a></li>
                        <li className="p-2"><a href="#" className="text-light link-info text-decoration-none">+2348166064166</a></li>
                           
                    </ul>
                </div>
                </Col>
                <Col className="">
                <div>
                    <p className="text-light fw-bold">Locating us</p>
                    <ul className="m-0 p-0" style={{listStyle:'none'}}>
                        <li className="p-2"><a href="#" className="text-light link-info text-decoration-none">Off Lasu Rd, Opposite Diamond Estate, Alimoso.</a></li>
                        <li className="p-2"><a href="#" className="text-light link-info text-decoration-none">Plot 5, Pepple Rd, Computer Village, Ikeja.</a></li>
                           
                    </ul>
                </div>
                </Col>
                
                <Col className="">
                <div>
                    <p className="text-light fw-bold">Apps & Resources</p>
                    <ul className="m-0 p-0" style={{listStyle:'none'}}>
                        <li className="p-2"><a href="#" className="text-light link-info text-decoration-none"><i className="bi bi-google-play fs-4"></i> Play store</a></li>
                        <li className="p-2"><a href="#" className="text-light link-info text-decoration-none"><i className="bi bi-apple fs-4"></i> App store</a></li>
                           
                    </ul>
                </div>
                </Col>
            </Row>
        </Container>
        // <Navbar bg="light" expand="sm" >
        //     <Container className="p-0">

        //     </Container>
        //     {/* <small className="text-danger p-0 m-0">Support our journey <a  href={donationUrl || 'https://paystack.shop/pay/support-ogasela'}>click here</a> to donate</small> */}
        // </Navbar>
    );
};

export default Footer;