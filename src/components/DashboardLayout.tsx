// src/layouts/DashboardLayout.tsx
import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import NavbarUnAuth from "./bars/NavBarUnAuth";
import BottomNavbar from "./bars/BottomNavbar";
import AuthenticationModal from "./modals/auth/AuthModal";
import LoginModal from "./modals/auth/LoginModal";
import SignUpModal from "./modals/auth/SignUpModal";

const DashboardLayout: React.FC = () => {
     const [authModal, setAuthModal] = useState(false);
    const [loginModal, setLoginModal] = useState(false);
    const [signUpModal, setSignUpModal] = useState(false);
    const navigate = useNavigate();


    const handleCheckAuth = (path: string) => {
        console.log({ seePath: path });
        const token = localStorage.getItem('userToken') || '';
        if (!token) {
            setAuthModal(true)
        } else {
            navigate(path)
        }
    }

    const handleLogin = () => {
        setLoginModal(true);
        setSignUpModal(false)
        setAuthModal(false);
    };

    const handleSignUp = () => {
        setLoginModal(false);
        setSignUpModal(true);
        setAuthModal(false);
    };
    return (
        <>
            <div className="dashboard-layout">
                {/* Example: add navbar, sidebar, etc. */}
                <NavbarUnAuth gotoProfile={() => handleCheckAuth('/dashboard/profile')} gotToPostAd={() => handleCheckAuth('/dashboard/post-ad')} />

                <div className="dashboard-content">
                    {/* Render nested routes */}
                    <Outlet />
                </div>
            </div>

            <BottomNavbar checkAuthStatus={(path: string) => handleCheckAuth(path)} />

            {/* Login/Signup Modal */}
            <AuthenticationModal handleLogin={handleLogin} handleSignUp={handleSignUp} on={authModal} off={() => setAuthModal(false)} />
            <LoginModal on={loginModal} off={() => setLoginModal(false)} onSignUp={handleSignUp} />
            <SignUpModal on={signUpModal} off={() => setSignUpModal(false)} onLogin={handleLogin} />
        </>);
};

export default DashboardLayout;
