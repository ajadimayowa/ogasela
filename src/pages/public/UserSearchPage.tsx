import React, { useEffect, useState } from "react";
import {
  Container,
  Button,
  Pagination,
  Spinner,
  Row,
  Col,
} from "react-bootstrap";
import api from "../../app/api";
import "bootstrap/dist/css/bootstrap.min.css";
import ProductAdCard from "../../components/cards/ProductAdCard";
import { IAd } from "../../interfaces/ad";
import { useNavigate } from "react-router-dom";
import NavbarUnAuth from "../../components/bars/NavBarUnAuth";
import BottomNavbar from "../../components/bars/BottomNavbar";
import AuthenticationModal from "../../components/modals/auth/AuthModal";
import LoginModal from "../../components/modals/auth/LoginModal";
import SignUpModal from "../../components/modals/auth/SignUpModal";
import VerifyEmailModal from "../../components/modals/auth/VerifyEmailModal";
import ReusableTypeToSearch from "../../components/custom-input/ReusableTypeToSearch";
import CustomIconButton from "../../components/custom-button/custom-icon-button";
import IconButton from "../../components/custom-button/IconButton";

const UserSearchPage: React.FC = () => {
  const [products, setProducts] = useState<IAd[]>([]);
  const [mostViewed, setMostViewed] = useState<IAd[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);

  const navigate = useNavigate();

  // Auth-related states
  const [authModal, setAuthModal] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  const [signUpModal, setSignUpModal] = useState(false);

  const handleLogin = () => {
    setLoginModal(true);
    setSignUpModal(false);
    setAuthModal(false);
  };

  const handleSignUp = () => {
    setLoginModal(false);
    setSignUpModal(true);
    setAuthModal(false);
  };

  const handleCheckAuth = (path: string) => {
    const token = localStorage.getItem("userToken") || "";
    if (!token) {
      setAuthModal(true);
    } else {
      navigate(path);
    }
  };

  // 🧠 Search logic
  const fetchAdsBySearch = async (searchedWord: string) => {
    try {
      if (!searchedWord.trim()) {
        setProducts([]); // empty search resets results
        return;
      }

      setLoading(true);
      const res = await api.get(`/ads?search=${searchedWord}`);
      const mappedSearch = res?.data?.data.map((ad: IAd) => ({ value: ad.id, label: ad.title }))
      setProducts(mappedSearch || []);

      setTotalPages(res?.data?.pagination?.totalPages || 1);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAdsMostViewed = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/ads`);
      const mappedSearch = res?.data?.data.filter((ad: IAd) => ad.views > 4)
      console.log({ viewed: mappedSearch })
      setMostViewed(mappedSearch);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdsMostViewed()
  }, [])

  // 🕐 Debounce search input
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (searchTerm) fetchAdsBySearch(searchTerm);
    }, 500); // Wait 0.5s after typing
    return () => clearTimeout(timeout);
  }, [searchTerm]);

  return (
    <>
      <NavbarUnAuth
        gotoProfile={() => handleCheckAuth("/dashboard/profile")}
        gotToPostAd={() => handleCheckAuth("/dashboard/post-ad")}
      />

      <div className="bg-primary py-5 p-2 d-flex gap-2 align-items-center justify-content-center">
        <IconButton className="d-flex gap-2 bg-light text-dark" onClick={() => navigate(-1)} icon="bi bi-chevron-left" title="Back" />
        {/* <Button
          variant="fw-bold border bg-light"
          onClick={}
        >
          Go Back
        </Button> */}

        <ReusableTypeToSearch
          options={products}
          onUserSearch={(value) => setSearchTerm(value)} // ✅ correct prop name
          onUserSelect={(val) => navigate(`/search?query=${encodeURIComponent(val?.label)}`)}
        />
      </div>

      <Container className="py-5">
        <h3 className="text-center mb-4 fw-bold">Popular search</h3>

        <div className="p-3">
          <Row>
            {
              mostViewed.map((viewed: IAd) => <Col><p className="rounded border text-center px-2">{viewed.title.split(' ')[0]}</p></Col>)
            }
          </Row>

        </div>

        {loading && (
          <div className="d-flex justify-content-center">
            <Spinner animation="border" />
          </div>
        )}

        {!loading && products.length === 0 && (
          <p className="text-center text-muted">No products found.</p>
        )}

        <div className="row">
          {products.map((product) => (
            <div key={product.id} className="col-md-3 col-sm-6 mb-4">
              {/* <ProductAdCard ad={product} /> */}
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="d-flex justify-content-center mt-4">
            <Pagination>
              {[...Array(totalPages)].map((_, i) => (
                <Pagination.Item
                  key={i}
                  active={i + 1 === page}
                  onClick={() => setPage(i + 1)}
                >
                  {i + 1}
                </Pagination.Item>
              ))}
            </Pagination>
          </div>
        )}
      </Container>

      <BottomNavbar checkAuthStatus={(path: string) => handleCheckAuth(path)} />

      {/* Auth Modals */}
      <AuthenticationModal
        handleLogin={handleLogin}
        handleSignUp={handleSignUp}
        on={authModal}
        off={() => setAuthModal(false)}
      />
      <LoginModal
        on={loginModal}
        off={() => setLoginModal(false)}
        onSignUp={handleSignUp}
      />
      <SignUpModal
        on={signUpModal}
        off={() => setSignUpModal(false)}
        onLogin={handleLogin}
      />
      <VerifyEmailModal
        on={false}
        off={() => console.log("ok")}
        email=""
      />
    </>
  );
};

export default UserSearchPage;
