/* eslint-disable no-console */
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
  const galleryRef = useRef<HTMLDivElement>(null);

  const [hideControlPrev, setHideControlPrev] = useState(false);
  const [hideControlNext, setHideControlNext] = useState(false);
  const [reelCentered, setReelCentered] = useState(true);
  const scrollAmount = 200;

  const scroll = (amount: number) => {
    if (reelRef.current) {
      reelRef.current.scrollTo({
        left: reelRef.current.scrollLeft + amount,
        behavior: 'smooth',
      });
    }
  };

  const scrollLeft = () => {
    scroll(-scrollAmount);
  };

  const scrollRight = () => {
    scroll(scrollAmount);
  };

  const handleGalleryAppearence = () => {
    if (galleryRef.current && reelRef.current) {
      const gallery = galleryRef.current;
      const reel = reelRef.current;

      // Calculate if the reel has left and/or right overflows
      const leftOverflow = reel.scrollLeft;
      console.log('leftOverflow', leftOverflow);

      const rightOverflow =
        reel.scrollWidth - reel.scrollLeft - gallery.clientWidth;
      console.log('rightOverflow', rightOverflow);
      console.log('reel.clientWidth', reel.clientWidth);
      console.log('reel.scrollWidth', reel.scrollWidth);
      console.log('gallery.clientWidth', gallery.clientWidth);

      // Set gallery appearence
      setHideControlPrev(leftOverflow < 2);
      setHideControlNext(rightOverflow < 2);
      setReelCentered(leftOverflow === 0 && rightOverflow === 0);
    }
  };

  useEffect(() => {
    handleGalleryAppearence();

    // Update gallery appeareance when window resizes
    window.addEventListener('resize', handleGalleryAppearence);

    // Update gallery appearence when reel scrolls
    if (reelRef.current) {
      reelRef.current.addEventListener('scroll', handleGalleryAppearence);
    }
    return () => {
      window.removeEventListener('resize', handleGalleryAppearence);
      if (reelRef.current) {
        reelRef.current.removeEventListener('scroll', handleGalleryAppearence);
      }
    };
  }, [reelRef.current]);

  return (
    <div className="thumbnails-gallery" ref={galleryRef}>
      <div
        className={`gallery-control-prev ${hideControlPrev ? 'hidden' : ''}`}
        onClick={scrollLeft}
        role="button"
        aria-label="Scroll left"
      >
        <span aria-hidden="true" className="gallery-control-prev-icon"></span>
      </div>
      <div
        className={`thumbnails-gallery-reel ${reelCentered ? 'centered' : ''} `}
        ref={reelRef}
      >
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
      <div
        className={`gallery-control-next ${hideControlNext ? 'hidden' : ''}`}
        onClick={scrollRight}
        role="button"
        aria-label="Scroll right"
      >
        <span aria-hidden="true" className="gallery-control-next-icon"></span>
      </div>
    </div>
  );
};

export default ThumbnailsGallery;
