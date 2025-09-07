import React from "react";
import { Carousel as ResponsiveCarousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { images } from "./image/data";


function Carousel() {
  return (
    <div>
      <ResponsiveCarousel
        autoPlay={true}
        infiniteLoop={true}
        showThumbs={false}
        showIndicators={false}
      >
        {images.map((imageItemLink, index) => (
          <div className="hero_img" key={index}>
            <img src={imageItemLink} alt={`Slide ${index + 1}`} />
          </div>
        ))}
      </ResponsiveCarousel>
    </div>
  );
}

export default Carousel;
