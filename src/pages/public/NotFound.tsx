import React from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Takes user to the previous page
  };

  return (
    <Container
      fluid
      className="d-flex flex-column justify-content-center align-items-center vh-100 text-center bg-light"
    >
      <Row>
        <Col>
          <h1 className="display-1 fw-bold text-primary">404</h1>
          <h2 className="mb-3">Page Not Found</h2>
          <p className="text-muted mb-4">
            The page you’re looking for doesn’t exist or has been moved.
          </p>

          {/* Optional illustration */}
          <img
            src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif"
            alt="Not found"
            style={{ width: "280px", marginBottom: "20px" }}
          />

          <div>
            <Button variant="primary" onClick={handleGoBack}>
              Go Back
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFound;