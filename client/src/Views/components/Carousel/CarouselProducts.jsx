import React from "react";
import { Link } from "react-router-dom";

const CarouselProducts = ({ products, title, carouselId }) => {
  const singleProduct = (p, i) => {
    return (
      <div className="col-2" key={i}>
        <Link
          to={`/product/${p._id}`}
          style={{ color: "#000", textDecoration: "none" }}
        >
          <div className="carouselProducts__card card text-center">
            <div
              style={{
                backgroundImage: `url(http://localhost:3500/${p.images[0]})`,
              }}
            />

            <span>
              {p.name.length > 15 ? `${p.name.slice(0, 15)}...` : p.name}
            </span>
            <span>${p.price}</span>
          </div>
        </Link>
      </div>
    );
  };

  const carouselRow = (products) => {
    return (
      <div className="row">{products.map((p, i) => singleProduct(p, i))}</div>
    );
  };

  return (
    <div className="carouselWrapper container">
      <h2 style={{ borderBottom: "1px solid lightgrey", padding: ".4rem" }}>
        {title}
      </h2>
      <div
        id={carouselId}
        className="carousel slide carouselProducts mt-4"
        data-ride="carousel"
        data-interval="false"
      >
        <div className="carousel-inner ">
          <div className={`carousel-item active`}>
            {carouselRow(products.slice(0, 6))}
          </div>

          <div className="carousel-item ">
            {carouselRow(products.slice(6, 12))}
          </div>
        </div>
        <a
          className="carousel-control-prev"
          href={`#${carouselId}`}
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
          href={`#${carouselId}`}
          role="button"
          data-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="sr-only">Next</span>
        </a>
      </div>
    </div>
  );
};

export default CarouselProducts;

// continue with the carousel
