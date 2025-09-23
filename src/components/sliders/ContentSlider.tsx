import { FC } from "react";
import { Carousel, Button } from "react-bootstrap";

export type Slide = {
  id: string | number;
  title?: string;
  subtitle?: string;
  image?: string;
  buttonText?: string;
  onButtonClick?: () => void;
};

type ContentSliderProps = {
  slides: Slide[];
  autoPlay?: boolean;
  interval?: number; // in ms
};

const ContentSlider: FC<ContentSliderProps> = ({
  slides,
  autoPlay = true,
  interval = 3000,
}) => {
  return (
    <Carousel
      controls={true}
      indicators={true}
      interval={autoPlay ? interval : undefined}
      className="content-slider p-3"
    >
      {slides.map((slide) => (
        <Carousel.Item key={slide.id} style={{ maxHeight: "320px", objectFit: "cover",minHeight:'300px' }}>
          {slide.image && (
            <div className="ratio ratio-16x9">
  <img
    src={slide.image}
    className="rounded rounded-4"
    alt={slide.title || "Slide"}
    style={{ objectFit: "cover" }}
  />
</div>
          )}
          <Carousel.Caption className="bg-light text-dark bg-opacity-20 rounded p-2">
            {slide.title && <h3>{slide.title}</h3>}
            {slide.subtitle && <p>{slide.subtitle}</p>}
            {slide.buttonText && (
              <Button
                variant="success"
                size="sm"
                onClick={slide.onButtonClick}
              >
                {slide.buttonText}
              </Button>
            )}
          </Carousel.Caption>
        </Carousel.Item>

        
      ))}
    </Carousel>
  );
};

export default ContentSlider;
