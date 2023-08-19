import React, { useState } from 'react';
import { Carousel } from 'react-bootstrap';
import ThumbnailsGallery from './thumbnails-gallery';

interface CardCarouselProps {
  imageUrls: string[];
  resizedImageUrls: string[];
}

const CardCarousel = ({ imageUrls, resizedImageUrls }: CardCarouselProps) => {
  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex) => setIndex(selectedIndex);
  return (
    <>
      <Carousel activeIndex={index} onSelect={handleSelect} indicators={false}>
        {imageUrls.map((imageUrl, idx) => (
          <Carousel.Item key={idx}>
            <img src={imageUrl} alt={`slide-${idx}`} />
          </Carousel.Item>
        ))}
      </Carousel>
      <ThumbnailsGallery
        imageUrls={resizedImageUrls}
        index={index}
        handleSelect={handleSelect}
      />
    </>
  );
};

export default CardCarousel;
