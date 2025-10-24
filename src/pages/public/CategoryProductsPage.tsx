import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Spinner,
  Pagination,
} from "react-bootstrap";
import api from "../../app/api";
import "bootstrap/dist/css/bootstrap.min.css";
import ProductAdCard from "../../components/cards/ProductAdCard";
import { IAd } from "../../interfaces/ad";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import NavbarUnAuth from "../../components/bars/NavBarUnAuth";
import { useDispatch } from "react-redux";
import BottomNavbar from "../../components/bars/BottomNavbar";
import AuthenticationModal from "../../components/modals/auth/AuthModal";
import LoginModal from "../../components/modals/auth/LoginModal";
import SignUpModal from "../../components/modals/auth/SignUpModal";
import VerifyEmailModal from "../../components/modals/auth/VerifyEmailModal";

const CategoryProductsPage: React.FC = () => {
  const [products, setProducts] = useState<IAd[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [condition, setCondition] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const dispatch = useDispatch();
  const [authModal, setAuthModal] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  const [signUpModal, setSignUpModal] = useState(false);

  const navigate = useNavigate();
  const { categoryId } = useParams(); // categoryId from route params
  const location = useLocation();
  const limit = 8;

  // optional if category data was passed via navigation state
  const categoryName = (location.state as any)?.categoryName || "Products";

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

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const params: any = {
        sortBy,
        page,
        limit,
        category: categoryId, // include categoryId filter
      };

      if (searchTerm.trim() !== "") params.search = searchTerm;
      if (state) params.state = state;
      if (city) params.city = city;
      if (condition) params.condition = condition;

      const res = await api.get("/ads", { params });
      setProducts(res?.data?.data || []);
      setTotalPages(res?.data?.pagination?.totalPages || 1);
    } catch (error) {
      console.error("Error fetching category products:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch on mount and when filters change
  useEffect(() => {
    window.scrollTo(0, 0);
    if (categoryId) fetchProducts();
  }, [categoryId, page, sortBy, state, city, condition]);

  // Debounced search
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (categoryId) fetchProducts();
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchProducts();
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <>
      <NavbarUnAuth
        gotoProfile={() => handleCheckAuth("/dashboard/profile")}
        gotToPostAd={() => handleCheckAuth("/dashboard/post-ad")}
      />

      <Button variant="outline fw-bold border mt-2" onClick={() => navigate(-1)}>
        Go Back
      </Button>

      <Container className="py-5">
        <h2 className="text-center mb-4 fw-bold">
          {categoryName} — Browse Products
        </h2>

        {/* Search, Filters & Sort */}
        <Form onSubmit={handleSearch} className="mb-4">
          <Row className="g-3">
            <Col md={4}>
              <Form.Control
                type="text"
                placeholder="Search by product or seller name..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setPage(1);
                }}
              />
            </Col>

            <Col md={2}>
              <Form.Select
                value={state}
                onChange={(e) => setState(e.target.value)}
              >
                <option value="">All States</option>
                <option value="Lagos">Lagos</option>
                <option value="Abuja">Abuja</option>
                <option value="Kano">Kano</option>
              </Form.Select>
            </Col>

            <Col md={2}>
              <Form.Select
                value={city}
                onChange={(e) => setCity(e.target.value)}
              >
                <option value="">All Cities</option>
                <option value="Ikeja">Ikeja</option>
                <option value="Lekki">Lekki</option>
                <option value="Garki">Garki</option>
              </Form.Select>
            </Col>

            <Col md={2}>
              <Form.Select
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
              >
                <option value="">All Conditions</option>
                <option value="new">New</option>
                <option value="used">Used</option>
              </Form.Select>
            </Col>

            <Col md={2}>
              <Form.Select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="createdAt">Newest</option>
                <option value="price">Price</option>
                <option value="city">City</option>
              </Form.Select>
            </Col>
          </Row>

          <Row className="mt-3">
            <Col md={{ span: 2, offset: 10 }}>
              <Button
                type="submit"
                variant="primary"
                className="w-100 fw-semibold"
              >
                Search
              </Button>
            </Col>
          </Row>
        </Form>

        {/* Products Section */}
        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" />
          </div>
        ) : products?.length === 0 ? (
          <p className="text-center text-muted py-5">No products found.</p>
        ) : (
          <Row className="g-4">
            {products.map((product) => (
              <Col md={3} key={product.id}>
                <ProductAdCard
                  id={product.id}
                  image={product.images[0]}
                  title={product.title}
                  sellerName={product.sellerName}
                  reviewCount={product.reviewCount}
                  price={product.price}
                  description={product.description}
                  onReviewClick={() =>
                    alert(`Go to reviews for ${product.title}`)
                  }
                  onCardClick={() => navigate(`/ad/${product.id}`)}
                />
              </Col>
            ))}
          </Row>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="d-flex justify-content-center mt-4">
            <Pagination>
              {[...Array(totalPages)].map((_, i) => (
                <Pagination.Item
                  key={i}
                  active={i + 1 === page}
                  onClick={() => handlePageChange(i + 1)}
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
      <VerifyEmailModal on={false} off={() => console.log("ok")} email="" />
    </>
  );
};

export default CategoryProductsPage;