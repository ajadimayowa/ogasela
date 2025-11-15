import React, { useEffect, useState } from "react";
import { Tabs, Tab, Container, Row, Col, Spinner, Card, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import api from "../../app/api"; // your axios instance
import { convertToThousand } from "../../utils/helpers"; // optional formatting helper
import ProductAdCard from "../../components/cards/ProductAdCard";
import { IAd } from "../../interfaces/ad";
import { useNavigate } from "react-router-dom";
import IconButton from "../../components/custom-button/IconButton";
import ActiveAdTab from "../../components/tabs/ActiveAds";
import PendingAdTab from "../../components/tabs/PendingAds";
import PendingReviewAdTab from "../../components/tabs/PendingReviewAds";

type Ad = {
    _id: string;
    image: string;
    title: string;
    price: number;
    category: string;
    status: string;
};

const AdCard: React.FC<{ ad: Ad }> = ({ ad }) => {
    
    return (
        <Card className="mb-3 shadow-sm rounded-3">
            <Row className="g-0">
                <Col xs={4}>
                    <Card.Img
                        src={ad.image}
                        alt={ad.title}
                        className="img-fluid rounded-start"
                        style={{ height: "100%", objectFit: "cover" }}
                    />
                </Col>
                <Col xs={8}>
                    <Card.Body>
                        <Card.Title className="fw-bold text-truncate">{ad.title}</Card.Title>
                        <Card.Text className="text-muted small mb-1">{ad.category}</Card.Text>
                        <Card.Text className="fw-semibold mb-2">
                            ₦{convertToThousand(ad.price)}
                        </Card.Text>
                        <Button size="sm" variant="outline-primary">
                            View
                        </Button>
                    </Card.Body>
                </Col>
            </Row>
        </Card>
    );
};

const MyAds: React.FC = () => {
    const userId = localStorage.getItem('userId') || ''
    const [key, setKey] = useState("active");
    const [ads, setAds] = useState<IAd[]>([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    const fetchAds = async (status: string) => {
        try {
            setLoading(true);
            const response = await api.get(`/ads?seller=${userId}&isActive=${true}`);
            setAds(response.data.data || []);
        } catch (error) {
            console.error("Error fetching ads:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAds(key);
    }, [key]);

    return (
        <>
         <div className="bg-primary py-5 p-2 d-flex gap-2 align-items-center">
        <IconButton className="d-flex gap-2 bg-light text-dark" onClick={() => navigate(-1)} icon="bi bi-chevron-left" title="Back" />
        {/* <Button
          variant="fw-bold border bg-light"
          onClick={}
        >
          Go Back
        </Button> */}
      </div>
      <Container className="my-4">
           
            <h4 className="fw-bold mb-3 text-center">My Ads</h4>
            <Tabs
                id="myads-tabs"
                activeKey={key}
                onSelect={(k) => setKey(k || "active")}
                className="mb-3 justify-content-center"
            >
                <Tab eventKey="active" title="Active Ads"><ActiveAdTab/></Tab>
                <Tab eventKey="pending" title="Pending Payment"><PendingAdTab/></Tab>
                <Tab eventKey="expired" title="Pending Review"><PendingReviewAdTab/></Tab>
            </Tabs>

            
        </Container>
        </>
        
    );
};

export default MyAds;