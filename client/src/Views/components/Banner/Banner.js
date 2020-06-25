import React from "react";
import { Link } from "react-router-dom";

const Banner = ({ url, gender, onClickBanner, colNum, text }) => {
  return (
    <div className={`col-12 col-md-${colNum}`}>
      <Link to={`/gallery`} onClick={onClickBanner}>
        <div
          className="banner position-relative"
          style={{ backgroundImage: `url(${url})` }}
        >
          <label className="position-absolute">{gender}</label>
          {text && <h4>{text}</h4>}
        </div>
      </Link>
    </div>
  );
};

export default Banner;
