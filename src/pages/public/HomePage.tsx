// src/pages/Login.tsx
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Col, Container, Navbar, Row, Spinner } from 'react-bootstrap';
import '../../styles/home.scss';
import CustomIconButton from '../../components/custom-button/custom-icon-button';
import ProductCategoryCard from '../../components/cards/ProductCategoryCard';
import ProductAdCard from '../../components/cards/ProductAdCard';
import ContentSlider, { Slide } from '../../components/sliders/ContentSlider';
import NavbarUnAuth from '../../components/bars/NavBarUnAuth';
import BottomNavbar from '../../components/bars/BottomNavbar';
import AuthenticationModal from '../../components/modals/auth/AuthModal';
import LoginModal from '../../components/modals/auth/LoginModal';
import SignUpModal from '../../components/modals/auth/SignUpModal';
import VerifyEmailModal from '../../components/modals/auth/VerifyEmailModal';
import { toast } from 'react-toastify';
import api from '../../app/api';
import { IAd } from '../../interfaces/ad';
import { useUserLocation } from '../../hooks/useUserLocation';
import Footer from '../../components/bars/Footer';
import { persistor } from '../../store/store';

export interface ICategory {
  id: string;
  image: string;
  name: string;
  slug: string;
}

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [recentlyPosted, setRecentlyPosted] = useState<IAd[]>([]);
  const [bestSelling, setBestSelling] = useState<IAd[]>([]);
  const [authModal, setAuthModal] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  const [signUpModal, setSignUpModal] = useState(false);
  const { location } = useUserLocation();

  // 🔹 Slides
  const slides: Slide[] = [
    {
      id: 1,
      title: "Buy and Sell Easily",
      subtitle: "Find amazing deals near you",
      image: "https://images.pexels.com/photos/4971966/pexels-photo-4971966.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      buttonText: "Start Shopping",
      onButtonClick: () => handleCheckAuth('/dashboard/post-ad'),
    },
    {
      id: 2,
      title: "Post Your Ad",
      subtitle: "Sell faster, reach more buyers",
      image: "https://www.kedglobal.com/data/ked/image/2022/05/02/ked202205020034.700x.0.jpg",
      buttonText: "Post Now",
      onButtonClick: () => handleCheckAuth('/dashboard/post-ad'),
    },
    {
      id: 3,
      title: "Safe & Secure",
      subtitle: "We keep your transactions safe",
      image: "https://www.shutterstock.com/image-photo/different-modern-devices-gadgets-on-260nw-2399256463.jpg",
    },
  ];

  // 🔹 Unified Home Fetch Function
  const getHomeData = async (lat?: number, lon?: number, controller?: AbortController) => {
    setLoading(true);
    try {
      const query = lat && lon ? `?lat=${lat}&lon=${lon}` : '';
      const res = await api.get(`home${query}`, { signal: controller?.signal });
      const payload = res?.data?.payload || {};

      setCategories(payload.categories?.reverse() || []);
      setRecentlyPosted(payload.recentlyPosted || []);
      setBestSelling(payload.topRatedSellers || []);
    } catch (error: any) {
      if (error.name !== 'CanceledError') {
        console.error('Error loading home data:', error);
        toast.error('Failed to load data');
      }
    } finally {
      setLoading(false);
    }
  };

  // const getAds = async (lat?: number, lon?: number, controller?: AbortController) => {
  //   setLoading(true);
  //   try {
  //     const query = lat && lon ? `?lat=${lat}&lon=${lon}` : '';
  //     const res = await api.get(`home${query}`, { signal: controller?.signal });
  //     const payload = res?.data?.payload || {};

  //     setCategories(payload.categories?.reverse() || []);
  //     setRecentlyPosted(payload.recentlyPosted || []);
  //     setBestSelling(payload.topRatedSellers || []);
  //   } catch (error: any) {
  //     if (error.name !== 'CanceledError') {
  //       console.error('Error loading home data:', error);
  //       toast.error('Failed to load data');
  //     }
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // 🔹 Check Auth Before Navigation
  const handleCheckAuth = (path: string) => {
    const token = localStorage.getItem('userToken');
    if (!token) {
      setAuthModal(true);
    } else {
      navigate(path);
    }
  };

  // 🔹 Initial Fetch (Nationwide)
  useEffect(() => {
    const controller = new AbortController();
    getHomeData(undefined, undefined, controller);
    window.scrollTo(0, 0);
    return () => controller.abort();
  }, []);

  // 🔹 Fetch Based on Location (When User Grants Access)
  useEffect(() => {
    if (location) {
      const controller = new AbortController();
      getHomeData(location.lat, location.lon, controller);
      return () => controller.abort();
    }
  }, [location]);

  return (
    <>

      <div className="homepage my-5">
        <NavbarUnAuth
          gotoProfile={() => handleCheckAuth('/dashboard/profile')}
          gotToPostAd={() => handleCheckAuth('/dashboard/post-ad')}
        />

        <div className="text-center p-3 w-100 bg-primary">

          <div className="w-100 d-flex align-items-center justify-content-center mt-3">

            <CustomIconButton
              onClick={() => navigate('/user-search')}
              icon="bi bi-search"
              variant="outline"
              className="border bg-light text-dark border-2 w-100 text-start m-3 d-flex justify-content-between"
              title="Search for anything..."
            />
          </div>
          <ContentSlider slides={slides} />
        </div>
        {/* Categories */}
        <div className="w-100 p-3 d-flex align-items-center justify-content-center" style={{ backgroundColor: "#E8FEF4" }}>
          <Container className="p-2">
            <div className="d-flex justify-content-between fw-bold">
              <h4 className="fw-bold">Categories</h4>
            </div>
            {loading && (
              <Col md={12} className="text-center">
                <Spinner />
              </Col>
            )}
            <Row xs={3} sm={8} md={4} className="g-1">
              {categories.map((cat) => (
                <Col key={cat.id}>
                  <ProductCategoryCard
                    id={cat.id}
                    title={cat.name}
                    image={cat.image}
                    onClick={() => navigate(`category/${cat.id}`)}
                  />
                </Col>
              ))}
            </Row>
          </Container>
        </div>

        {/* Recently Posted */}
        {!loading && (
          <>
            <Container className="mt-5">
              <div className="d-flex justify-content-between fw-bold">
                <h4 className="fw-bold">Trending Ads</h4>
              </div>
              <Row className="g-3">
                {bestSelling.map((product: IAd) => (
                  <Col xs={6} sm={4} md={3} key={product.id} className="mt-4">
                    <ProductAdCard
                      condition={product.condition}
                      sellerVerfied={false}
                      onReviewClick={() => console.log('ok')}
                      id={product.id}
                      image={product.images[0]}
                      title={product.title}
                      sellerName={product.sellerName}
                      location={`${product?.location.city},${product?.location.state}`}
                      reviewCount={product.reviewCount}
                      views={product.views}
                      price={product.price}
                      description={product.description}
                      onCardClick={() => navigate(`/ad/${product.id}`)}
                    />
                  </Col>
                ))}
                <Col xs={6} sm={4} md={3} className="mt-4">
                  <div className='d-flex text-center border justify-content-center align-items-center' style={{ height: '100%', backgroundColor: '#E9E9E9' }}>
                    <a href={`/ads`}>See more</a>
                  </div>
                </Col>
              </Row>

            </Container>

            {/* Best Selling */}
            <Container className="mt-5">
              <div className="d-flex justify-content-between fw-bold">
                <h4 className="fw-bold">Best Selling</h4>
              </div>
              <Row className="g-3">
                {bestSelling.map((product: IAd) => (
                  <Col xs={6} sm={6} md={3} key={product.id} className="mt-4">
                    <ProductAdCard
                      onReviewClick={() => console.log('ok')}
                      condition={product.condition}
                      sellerVerfied={false}
                      id={product.id}
                      image={product.images[0]}
                      title={product.title}
                      location={`${product?.location.city},${product?.location.state}`}
                      sellerName={product.sellerName}
                      reviewCount={product.reviewCount}
                      views={product.views}
                      price={product.price}
                      description={product.description}
                      onCardClick={() => navigate(`/ad/${product.id}`)}
                    />
                  </Col>
                ))}
                <Col xs={6} sm={4} md={3} className="mt-4">
                  <div className='d-flex text-center  border justify-content-center align-items-center' style={{ height: '100%', backgroundColor: '#E9E9E9' }}>
                    <a href={`category/${recentlyPosted[0]?.category}`}>See more</a>
                  </div>
                </Col>
              </Row>
            </Container>
          </>
        )}




      </div>
      <Footer
        gotoProfile={() => console.log('')}
        gotToPostAd={() => console.log('')}
      />

      <BottomNavbar checkAuthStatus={(path: string) => handleCheckAuth(path)} />


      {/* Auth Modals */}
      <AuthenticationModal
        handleLogin={() => {
          setLoginModal(true);
          setAuthModal(false);
        }}
        handleSignUp={() => {
          setSignUpModal(true);
          setAuthModal(false);
        }}
        on={authModal}
        off={() => setAuthModal(false)}
      />

      <LoginModal on={loginModal} off={() => setLoginModal(false)} onSignUp={() => setSignUpModal(true)} />
      <SignUpModal on={signUpModal} off={() => setSignUpModal(false)} onLogin={() => setLoginModal(true)} />
      <VerifyEmailModal on={false} off={() => console.log('ok')} email="" />
    </>
  );
};

export default HomePage;