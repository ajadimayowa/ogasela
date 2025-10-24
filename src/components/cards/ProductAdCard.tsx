import { Card, Button } from "react-bootstrap";
import { convertToThousand } from "../../utils/helpers";

type ProductAdCardProps = {
  id: string;
  image: string;
  title: string;
  sellerName: string;
  reviewCount: number;
  price: string | number;
  description: string;
  onReviewClick: () => void;
  onCardClick: () => void;
};

const ProductAdCard: React.FC<ProductAdCardProps> = ({
  id,
  image,
  title,
  sellerName,
  reviewCount,
  price,
  description,
  onReviewClick,
  onCardClick,
}) => {
  return (
    <Card
      className="shadow-sm mb-3"
      style={{ cursor: "pointer", minHeight: "100%" }}
      onClick={onCardClick}
    >
      <Card.Img
        variant="top"
        src={image}
        alt={title}
        style={{ objectFit: "cover", height: "200px" }}
      />
      <Card.Body>
        <Card.Title className="fw-bold">{title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {sellerName} •{" "}
          <span
            className="text-primary"
            style={{ textDecoration: "underline", cursor: "pointer" }}
            onClick={(e) => {
              e.stopPropagation();
              onReviewClick();
            }}
          >
            {reviewCount} <i className="bi bi-star text-danger"></i>
          </span>
        </Card.Subtitle>
        <h5 className="text-success fw-bold">{convertToThousand(price)}</h5>
        <Card.Text className="text-truncate">{description}</Card.Text>
        <Button
          variant="outline-primary"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            onCardClick();
          }}
        >
          View Product
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProductAdCard;
