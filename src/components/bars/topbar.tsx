import React from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Button } from "react-bootstrap";

const TopBar: React.FC<any> = ({ type,offSideBar }) => {
    const currentPath = useLocation().pathname;
    const token = localStorage.getItem('userToken');
    
    const menus = [
        {
            title: 'Home',
            icon: 'bi-house-door',
            path: '/surplus'
        },
        {
            title: 'Saved',
            icon: 'bi-basket2',
            path: '/app/dash/products'
        },
        {
            title: 'Sell',
            icon: 'bi-bag-check',
            path: '/app/dash/sales'
        },
        {
            title: 'Messages',
            icon: 'bi-envelope',
            path: '/app/dash/messages'
        },
        {
            title: 'Profile',
            icon: 'bi-person',
            path: '/app/dash'
        },
    ]


    if (type == 'authenticated') {
        return (
            <nav className="navbar sticky-top navbar-expand-lg navbar-light bg-light py-4 px-3">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Navbar</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Link</a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Dropdown
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><a className="dropdown-item" href="#">Action</a></li>
                                    <li><a className="dropdown-item" href="#">Another action</a></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><a className="dropdown-item" href="#">Something else here</a></li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link disabled" href="#" aria-disabled="true">Disabled</a>
                            </li>
                        </ul>
                        <form className="d-flex">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </nav>
        )
    } else {
        return (
            <nav className="navbar sticky-top navbar-expand-lg py-4 px-3 navbar-light bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand " href="#">Ogasela</a>
                    <button 
                    onClick={()=>offSideBar()}
                    className="navbar-toggler " type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="me-auto  mb-2 mb-lg-0">


                        </ul>

                        <ul className="navbar-nav mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="support">Support</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="login">Login</a>
                            </li>
                            <li className="nav-item">
                                <Link className="text-light" to={'signup'}><Button>Get Started</Button></Link>
                            </li>
                        </ul>
                        {/* <form className="d-flex">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form> */}
                    </div>
                </div>
            </nav>
        )
    }

}
export default TopBar;