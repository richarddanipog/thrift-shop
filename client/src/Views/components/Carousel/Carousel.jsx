import React from "react";

const Carousel = () => {
  const imagesCarousel = (img) => {
    return (
      <div
        className={`carousel-item ${img === 1 ? "active" : ""}`}
        key={img}
        style={{ backgroundImage: `url(../../../images/pic${img}.jpg)` }}
      >
        <div className="carousel-item__wrapper"></div>
      </div>
    );
  };
  return (
    <div>
      <div
        id="carouselHomePage"
        className="carousel slide carousel-fade position-relative"
        data-ride="carousel"
      >
        <div className="carousel-inner">
          {[1, 2, 3, 4, 5].map((img) => imagesCarousel(img))}
        </div>
        <a
          className="carousel-control-prev"
          href="#carouselHomePage"
          role="button"
          data-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="sr-only">Previous</span>
        </a>
        <a
          className="carousel-control-next"
          href="#carouselHomePage"
          role="button"
          data-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="sr-only">Next</span>
        </a>

        <div className={"carousel__title"}>
          <h1>THE RISE OF SECONDHAND FASHION</h1>
          <p>
            Here’s why pre-loved clothing will become mainstream in the next
            decade.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
