import React, { useEffect, useState } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import { IAd } from "../../interfaces/ad";
import ProductAdCard from "../cards/ProductAdCard";
import { useNavigate } from "react-router-dom";
import api from "../../app/api";

const PendingReviewAdTab: React.FC<any> = ({ }) => {
    const userId = localStorage.getItem('userId') || ''
    const [key, setKey] = useState("active");
    const [ads, setAds] = useState<IAd[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchAds = async (status: string) => {
        try {
            setLoading(true);
            const response = await api.get(`/ads?seller=${userId}&isActive=${false}`);
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


    const navigate = useNavigate()
    return (
        <div>
            {loading ? (
                <div className="text-center py-5">
                    <Spinner animation="border" />
                </div>
            ) : ads.length > 0 ? (
                <Row className="g-3">
                    {
                        ads.map((ad: IAd) => (


                            <Col xs={6} sm={6} md={3} key={ad.id} className='mt-4'>
                                <ProductAdCard
                                    id={ad.id}
                                    condition={ad.condition}
                                    sellerVerfied={false}
                                    image={ad.images[0]}
                                    title={ad.title}
                                    sellerName={ad.sellerName}
                                    location={`${ad?.location.city},${ad?.location.state}`}
                                    reviewCount={ad.reviewCount}
                                    views={ad.views}
                                    price={ad?.price}
                                    description={ad.description}
                                    onReviewClick={() => alert(`Go to reviews for ${ad.title}`)}
                                    onCardClick={() => navigate(`/ad/${ad.id}`)}
                                />
                            </Col>

                        ))

                    }
                </Row>)
                : (
                    <div className="text-center text-muted py-5">
                        No ads found.
                    </div>
                )}
        </div>
    )
}

export default PendingReviewAdTab