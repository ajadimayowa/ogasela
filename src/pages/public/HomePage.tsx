// src/pages/Login.tsx
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setToken } from '../../features/auth/authSlice';
import { Form, Button, Card, Image, Navbar, Container, Nav, Modal, Row, Col } from 'react-bootstrap';
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

export interface ILogin {
    email: string;
    password: string;
}
const HomePage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showModal, setShowModal] = useState(false);

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
        setIsLoggedIn(true);
        setShowModal(false);
    };


    const sampleProducts = [
        {
            id: "1",
            image: "https://verifiedsell.s3.eu-north-1.amazonaws.com/verifiedsell-assets/product-pictures/applewatchultra.png",
            title: "Apple watch ultra",
            sellerName: "kingFLoath",
            reviewCount: 128,
            price: "49.99",
            description: "High-quality ultra watch",
        },
        {
            id: "2",
            image: "https://verifiedsell.s3.eu-north-1.amazonaws.com/verifiedsell-assets/product-pictures/Canon+EOS+M200+Mirrorless+Digital+Vlogging+Content+Creator+Kit+%5BBlack%5D.png",
            title: "Canon Eos M200",
            sellerName: "CaseKing",
            reviewCount: 54,
            price: "19.99",
            description: "Durable and stylish digital canon camera available in multiple colors.",
        },
        {
            id: "3",
            image: "https://verifiedsell.s3.eu-north-1.amazonaws.com/verifiedsell-assets/product-pictures/iphone16promax.png",
            title: "Iphone 16 Pro Max",
            sellerName: "VisionElectronics",
            reviewCount: 230,
            price: "499.99",
            description: "Ultra HD Smart Iphone 16 Pro max with vibrant display and voice assistant support.",
        },
        {
            id: "4",
            image: "https://verifiedsell.s3.eu-north-1.amazonaws.com/verifiedsell-assets/product-pictures/applewatchultra.png",
            title: "Apple Watch -Ultra",
            sellerName: "Yk Store",
            reviewCount: 128,
            price: "49.99",
            description: "High-quality wireless earbuds with noise cancellation.",
        },
    ];

    const categories = [
        { id: '1', title: "Phones & Electronics", image: phoneCatIcon },
        { id: '2', title: "Fashion & Accesories", image: "https://cdn-icons-png.flaticon.com/512/892/892458.png" },
        { id: '3', title: "Vehicles & Auto parts", image: "https://cdn-icons-png.flaticon.com/512/744/744465.png" },
        { id: '4', title: "Real Estate & Rentals", image: "https://cdn-icons-png.flaticon.com/512/619/619153.png" },
        { id: '4', title: "Beauty & Cosmetics", image: cosCatIcon },
        { id: '4', title: "Food & Groceries", image: groceCatIcon },
        { id: '4', title: "Skill & Services", image: serviceCatIcon },
        { id: '4', title: "Tech & Programing", image: progCatIcon },
    ];

    const slides: Slide[] = [
        {
            id: 1,
            title: "Buy and Sell Easily",
            subtitle: "Find amazing deals near you",
            image: 'https://images.pexels.com/photos/4971966/pexels-photo-4971966.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            buttonText: "Start Shopping",
            onButtonClick: () => alert("Go to Shop"),
        },
        {
            id: 2,
            title: "Post Your Ad",
            subtitle: "Sell faster, reach more buyers",
            image: "https://www.kedglobal.com/data/ked/image/2022/05/02/ked202205020034.700x.0.jpg",
            buttonText: "Post Now",
            onButtonClick: () => alert("Post Ad"),
        },
        {
            id: 3,
            title: "Safe & Secure",
            subtitle: "We keep your transactions safe",
            image: "https://www.shutterstock.com/image-photo/different-modern-devices-gadgets-on-260nw-2399256463.jpg",
        },
    ];

    return (
        <div className="homepage">
            {/* Header / Navbar */}
            <NavbarUnAuth />

            {/* Main Body */}
            <div className="text-center p-0 w-100 bg-primary">
                <div className="w-100 d-flex align-items-center justify-content-center mt-3">
                    <CustomIconButton
                        icon="bi bi-search"
                        variant="outline"
                        className="border bg-light text-dark border-2 w-100 text-start m-3 d-flex justify-content-between"
                        title="Search for anything..."
                    />
                </div>
                <ContentSlider slides={slides} />
            </div>

<div className='w-100 p-3 d-flex align-items-center justify-content-center' style={{ backgroundColor: "#E8FEF4" }}>
    <Container className="p-2">
                <div className="d-flex justify-content-between fw-bold">
                    <h4 className="fw-bold">Categories</h4>
                </div>
                <Row xs={3} sm={8} md={4} className="g-1">
                    {categories.map((cat, idx) => (
                        <Col key={idx}>
                            <ProductCategoryCard
                                id={cat.id}
                                title={cat.title}
                                image={cat.image}
                                onClick={() => alert(`Go to ${cat.title}`)}
                            />
                        </Col>
                    ))}
                </Row>

            </Container>

</div>
            


            <Container className="mt-5">
                <div className="d-flex justify-content-between fw-bold">
                    <h4 className="fw-bold">Top Rated</h4>
                </div>

                <Row className="g-1">
                    {sampleProducts.map((product) => (
                        <Col xs={6} sm={6} md={3} key={product.id}>
                            <ProductAdCard
                                {...product}
                                onReviewClick={() => alert(`Go to reviews for ${product.title}`)}
                                onCardClick={() => alert(`Go to product page for ${product.title}`)}
                            />
                        </Col>
                    ))}
                </Row>
                <div className='w-100 text-end'>
                     <a href="#">See more</a>
                </div>
            </Container>

            <Container className="mt-5">
                <div className="d-flex justify-content-between fw-bold">
                    <h4 className="fw-bold">Best sellers</h4>
                </div>

                <Row className="g-1">
                    {sampleProducts.map((product) => (
                        <Col xs={6} sm={6} md={3} key={product.id}>
                            <ProductAdCard
                                {...product}
                                onReviewClick={() => alert(`Go to reviews for ${product.title}`)}
                                onCardClick={() => alert(`Go to product page for ${product.title}`)}
                            />
                        </Col>
                    ))}
                </Row>
                <div className='w-100 text-end'>
                     <a href="#">See more</a>
                </div>
            </Container>
            <Container className="mt-5">
                <div className="d-flex justify-content-between fw-bold">
                    <h4 className="fw-bold">Best deals</h4>
                </div>

                <Row className="g-1">
                    {sampleProducts.map((product) => (
                        <Col xs={6} sm={6} md={3} key={product.id}>
                            <ProductAdCard
                                {...product}
                                onReviewClick={() => alert(`Go to reviews for ${product.title}`)}
                                onCardClick={() => alert(`Go to product page for ${product.title}`)}
                            />
                        </Col>
                    ))}
                </Row>
                <div className='w-100 text-end'>
                     <a href="#">See more</a>
                </div>
            </Container>








            <BottomNavbar />

            {/* Login/Signup Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Login / Sign Up</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Please log in to continue.</p>
                    <Button
                        className="w-100 mb-2"
                        variant="primary"
                        onClick={handleLogin}
                    >
                        Login
                    </Button>
                    <Button className="w-100" variant="outline-secondary">
                        Sign Up
                    </Button>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default HomePage;