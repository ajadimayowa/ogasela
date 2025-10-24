// src/pages/Login.tsx
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useNavigation } from 'react-router-dom';
import { setToken } from '../../features/auth/authSlice';
import { Form, Button, Card, Image, Navbar, Container, Nav, Modal, Row, Col, Spinner, Collapse } from 'react-bootstrap';
import '../../styles/home.scss';
import compnayLogo from '../assets/images/bc-kash-logo.png'; // Adjust the path as necessary
import CustomInput from '../../components/custom-input/CustormInput';
import CustomButton from '../../components/custom-button/custom-button';
import { ErrorMessage, Formik } from 'formik';
import * as Yup from 'yup';
import api from '../../app/api';
import { toast } from 'react-toastify';
import NavbarUnAuth from '../../components/bars/NavBarUnAuth';
import BottomNavbar from '../../components/bars/BottomNavbar';
import ContentSlider, { Slide } from '../../components/sliders/ContentSlider';
import CustomIconButton from '../../components/custom-button/custom-icon-button';
import ProductCategoryCard from '../../components/cards/ProductCategoryCard';
import ProductAdCard from '../../components/cards/ProductAdCard';
import slideImg1 from '../../assets/slides/ogasela-carousel-phones-web.jpg';

import phoneCatIcon from '../../assets/icons/product-category/phones.png';
import groceCatIcon from '../../assets/icons/product-category/grocery.png';
import serviceCatIcon from '../../assets/icons/product-category/services.png';
import progCatIcon from '../../assets/icons/product-category/programing.png';
import cosCatIcon from '../../assets/icons/product-category/cosmetics.png';
import { IAd } from '../../interfaces/ad';
import ReusableInputs from '../../components/custom-input/ReusableInputs';
import LoginModal from '../../components/modals/auth/LoginModal';
import AuthenticationModal from '../../components/modals/auth/AuthModal';
import SignUpModal from '../../components/modals/auth/SignUpModal';

export interface ILogin {
    email: string;
    password: string;
}

export interface ICategory {
    id: string;
    image: string;
    name: string;
    slug: string
}

export interface IHomeSlide {
    id: string;
    image: string;
    name: string;
    slug: string
}
const FavoritesPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [recentlyPosted, setRecentlyPosted] = useState<IAd[]>([]);
    const [homeSlides, sethomeSlides] = useState<ICategory[]>([]);
    const [authModal, setAuthModal] = useState(false);
    const [loginModal, setLoginModal] = useState(false);
    const [signUpModal, setSignUpModal] = useState(false);

    const [openInfo, setOpenInfo] = useState(false);
    const handleLogout = () => {
        navigate('/');
        localStorage.clear();
    }

    const profileActivities = [
        {
            title: 'Marketing', subActions: [
                {
                    icon: 'bi bi-cart-check',
                    label: 'All Ads',
                    path: '/ads',
                    count: 2
                },
                {
                    icon: 'bi bi-chat-heart',
                    label: 'Reviews',
                    path: '/ads',
                    count: ''
                },
                {
                    icon: 'bi bi-bar-chart',
                    label: 'Sales',
                    path: '/ads',
                    count: '',
                }
            ]
        },
        {
            title: 'Analytics', subActions: [
                {
                    icon: 'bi bi-graph-up-arrow',
                    label: 'Perfomance',
                    path: '/ads',
                    count: ''
                },
                {
                    icon: 'bi bi-wallet',
                    label: 'Total Spent',
                    path: '/ads',
                    count: ''
                },
                {
                    icon: 'bi bi-cash-stack',
                    label: 'Balance',
                    path: '/ads',
                    count: ''
                }
            ]
        },
        {
            title: 'Follow up', subActions: [
                {
                    icon: 'bi bi-bell',
                    label: 'Notifications',
                    path: '/ads',
                    count: ''
                },
                {
                    icon: 'bi bi-exclamation-triangle',
                    label: 'Warnings',
                    path: '/ads',
                    count: ''
                }
            ]
        },
        {
            title: 'Prefferences', subActions: [
                {
                    icon: 'bi bi-person',
                    label: 'Profile',
                    path: '/ads',
                    count: ''
                },
                {
                    icon: 'bi bi-box-arrow-left',
                    label: 'Logout',
                    path: '',
                    count: ''
                }
            ]
        }
    ]

    const initialValues = {
        email: '',
        password: '',
    };
    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email('Invalid email format')
            .required('Email is required'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required'),
    });

    const handleSubmit = async (payload: ILogin) => {
        setLoading(true);
        // console.log({sending:payload});
        try {
            const res = await api.post('/staff/login', payload);
            navigate('/verify-login-otp', { state: { email: payload.email } });
            setLoading(false);
        } catch (error: any) {
            console.log({ errorHere: error })
            setLoading(false);
            if (error?.data?.message) {
                toast.error(error?.data?.message)
            } else {
                console.log({ seeError: error })
                toast.error(error?.message)
            }
        }
    };



    const handleProtectedClick = () => {
        if (!isLoggedIn) {
            setShowModal(true);
        } else {
            alert("Welcome back! You can now access this feature.");
        }
    };

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

    const slides: Slide[] = [
        {
            id: 1,
            title: "Buy and Sell Easily",
            subtitle: "Find amazing deals near you",
            image: 'https://images.pexels.com/photos/4971966/pexels-photo-4971966.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            buttonText: "Start Shopping",
            onButtonClick: () => handleCheckAuth('/post'),
        },
        {
            id: 2,
            title: "Post Your Ad",
            subtitle: "Sell faster, reach more buyers",
            image: "https://www.kedglobal.com/data/ked/image/2022/05/02/ked202205020034.700x.0.jpg",
            buttonText: "Post Now",
            onButtonClick: () => handleCheckAuth('/post'),
        },
        {
            id: 3,
            title: "Safe & Secure",
            subtitle: "We keep your transactions safe",
            image: "https://www.shutterstock.com/image-photo/different-modern-devices-gadgets-on-260nw-2399256463.jpg",
        },
    ];

    const getHomeData = async () => {
        setLoading(true);
        try {
            const res = await api.get('home');
            setCategories(res?.data?.payload?.categories.reverse());
            setRecentlyPosted(res?.data?.payload?.recentlyPosted.reverse());
            // setHomeSlides8(res?.data?.payload?.categories.reverse());
            console.log({ seeRes: res });
            setLoading(false);
        } catch (error) {
            console.log({ seeErr: error })

        }

    }

    const handleCheckAuth = (path: string) => {
        console.log({ seePath: path });
        const token = localStorage.getItem('userToken') || '';
        if (!token) {
            setAuthModal(true)
        } else {
            navigate(path)
        }
    }

    const loginUser = async (v: any) => {
        setLoading(true)
        try {

            const res = await api.post('auth/login', v);
            // localStorage.setItem("userToken",)
            console.log({ seeDat: res })
            setLoading(false)
        } catch (error) {
            setLoading(false)
        }
    }

    useEffect(() => {
        getHomeData()
    }, [navigate])

    return (
        <div>

            {/* Main Body */}
            <div className="text-center p-0 w-100 bg-info">
                <div>
                    <div className='d-flex justify-content-between p-2 align-items-center text-light'>
                        <p className='text-light fw-bold p-0 m-0'>Anouncement!</p>
                        <Button
                            onClick={() => setOpenInfo(!openInfo)}
                            aria-controls="collapse-content"
                            className='p-0 text-light'
                            variant="outline"
                        >
                            {openInfo ? "Hide" : "Show"}
                        </Button>

                    </div>

                    <Collapse in={openInfo}>
                        <div id="collapse-content" className="mt-3 p-3 border rounded bg-info text-light">
                            <p className='text-light p-0 m-0'>
                                Kindly update your profile to get the full experience.
                            </p>
                            <p className='text-light p-0 m-0'>
                                If you have any questions, dont hesitate to reach out to us!
                            </p>
                        </div>
                    </Collapse>
                </div>

            </div>
            <Row className='mt-4'>
                {
                    !loading &&
                    <Col md={12} className='text-center'>
                        <h3>Under Development</h3>
                    </Col>

                }
            </Row>

            <Row className='mt-4'>
                {
                    loading &&
                    <Col md={12} className='text-center'>
                        <Spinner />
                    </Col>

                }
            </Row>

            <BottomNavbar checkAuthStatus={(path: string) => handleCheckAuth(path)} />

            {/* Login/Signup Modal */}
            <AuthenticationModal handleLogin={handleLogin} handleSignUp={handleSignUp} on={authModal} off={() => setAuthModal(false)} />
            <LoginModal on={loginModal} off={() => setLoginModal(false)} onSignUp={handleSignUp} />
            <SignUpModal on={signUpModal} off={() => setSignUpModal(false)} onLogin={handleLogin} />
        </div>
    );
};

export default FavoritesPage;