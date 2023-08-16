import React, { useEffect, useRef, useState } from 'react';

interface ThumbnailsStripeProps {
  imageUrls: string[];
  index: number;
  handleSelect: (index: number) => void;
}

const ThumbnailsGallery = ({
  imageUrls,
  index,
  handleSelect,
}: ThumbnailsStripeProps) => {
  const reelRef = useRef<HTMLDivElement>(null);

  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const scrollAmount = 100;

  const scrollLeft = () => {
    if (reelRef.current) {
      reelRef.current.scrollLeft -= scrollAmount;
    }
  };

  const scrollRight = () => {
    if (reelRef.current) {
      reelRef.current.scrollLeft += scrollAmount;
    }
  };

  const handleScroll = () => {
    if (reelRef.current) {
      const reel = reelRef.current;

      // Calculate if the reel has left and/or right overflows
      const reelHasLeftOverflow = reel.scrollLeft > 0;
      const reelHasRightOverflow =
        reel.scrollWidth - reel.scrollLeft > reel.clientWidth;

      // Set the state to show the left and/or right arrows
      setShowLeftArrow(reelHasLeftOverflow);
      setShowRightArrow(reelHasRightOverflow);
    }
  };

  useEffect(() => {
    if (reelRef.current) {
      const reel = reelRef.current;

      const reelHasRightOverflow = reel.scrollWidth > reel.clientWidth;
      setShowRightArrow(reelHasRightOverflow);

      reel.addEventListener('scroll', handleScroll);
      return () => {
        reel.removeEventListener('scroll', handleScroll);
      };
    }
  }, [reelRef.current]);

  return (
    <div className="thumbnails-gallery-outer-container">
      {showLeftArrow && <button onClick={scrollLeft}>{'<'}</button>}
      <div className="thumbnails-gallery-inner-container" ref={reelRef}>
        {imageUrls.map((imageUrl, idx) => (
          <img
            key={idx}
            src={imageUrl}
            alt={`thumbnail-${idx}`}
            onClick={() => handleSelect(idx)}
            className={`thumbnail ${index === idx ? 'active-thumbnail' : ''}`}
          />
        ))}
      </div>
      {showRightArrow && <button onClick={scrollRight}>{'>'}</button>}
    </div>
  );
};

export default ThumbnailsGallery;
