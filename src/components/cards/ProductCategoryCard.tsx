import { FC } from "react";
import { Card } from "react-bootstrap";

type ProductCategoryCardProps = {
    id: string;
    title: string;
    image: string;
    onClick?: () => void;
};

const ProductCategoryCard: FC<ProductCategoryCardProps> = ({ title, image, id, onClick }) => {
   

    return (
        <Card
            className="h-100 shadow-sm border-0 category-card p-3"
            onClick={onClick}
            style={{ cursor: "pointer"}}
        >
            <div className="d-flex justify-content-center align-items-center p-3">
                <Card.Img
                    variant="top"
                    src={image}
                    alt={title}
                    style={{
                        width: "50px",
                        height: "50px",
                        objectFit: "contain",
                    }}
                />
            </div>
            <Card.Body className="text-center p-0">
                <Card.Title as="h6" className="mb-0">
                    {title}
                </Card.Title>
            </Card.Body>
        </Card>
    );
};

export default ProductCategoryCard;
