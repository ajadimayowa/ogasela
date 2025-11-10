import { Card, Button, Badge } from "react-bootstrap";
import { convertToThousand } from "../../utils/helpers";

type ProductAdCardProps = {
  id: string;
  image: string;
  title: string;
  sellerName: string;
  location: string;
  reviewCount: number;
  views:number;
  condition: string,
  sellerVerfied: boolean,
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
  location,
  reviewCount,
  views,
  price,
  condition,
  sellerVerfied,
  description,
  onReviewClick,
  onCardClick,
}) => {
  return (
    <Card
      className="shadow-sm mb-3"
      style={{ cursor: "pointer", minHeight: "100%", position: 'relative' }}
      onClick={onCardClick}
    >
      <Card.Img
        variant="top"
        src={image}
        alt={title}
        style={{
          objectFit: "cover", objectPosition: "center top", // ✅ this is the correct property
          height: "200px",
          width: "100%",
        }}
      />
      <div className="bg-light p-1 rounded" style={{ position: 'absolute', top: 10, right: 10 }}><i className="bi bi-heart text-danger"></i></div>
      <Card.Body>
        <Card.Title className="fw-bold">{title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {sellerName} •{" "}
          <span
            className="text-info"
            style={{ cursor: "pointer" }}
            onClick={(e) => {
              e.stopPropagation();
              onReviewClick();
            }}
          >
            {views} <i className="bi bi-eye"></i>
            {/* <i className="bi bi-star text-danger"></i> */}
          </span>
        </Card.Subtitle>
        <small className="d-flex gap-2">
          <i className="bi bi-geo-alt"></i>
          {location}
        </small>
        <h5 className="text-success fw-bold mt-2">{convertToThousand(price)}</h5>


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
      <Card.Footer>

        <div className="d-flex justify-content-between"> <Badge className="text-dark border bg-light">{condition}</Badge> <Badge className="text-light">{sellerVerfied ? 'verified' : 'Un Verified'}</Badge></div>
      </Card.Footer>
    </Card>
  );
};

export default ProductAdCard;
