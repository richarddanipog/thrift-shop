import React, { useState } from "react";

const PriceButton = ({ addQuery }) => {
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const onPriceChange = ({ target: { name, value } }) => {
    name === "minPrice" ? setMinPrice(value) : setMaxPrice(value);
  };

  const onSubmitForm = (e) => {
    e.preventDefault();
    addQuery({ minPrice, maxPrice });
  };

  return (
    <div className="gallery__filters--btn">
      <a className="card-link" data-toggle="collapse" href="#collapseTwo">
        <div className="gallery__filters--btn-text">Price</div>
      </a>
      <div id="collapseTwo" className="collapse" data-parent="#accordion">
        <div className="card-body">
          <form className="formWrapper" onSubmit={onSubmitForm}>
            <div className="price">
              <div className="price__input">
                <span>
                  <i className="fa fa-dollar-sign" />
                </span>
                <input
                  type="text"
                  placeholder="Min"
                  value={minPrice}
                  name="minPrice"
                  onChange={onPriceChange}
                />
              </div>
              -
              <div className="price__input">
                <span>
                  <i className="fa fa-dollar-sign" />
                </span>
                <input
                  type="text"
                  placeholder="Max"
                  value={maxPrice}
                  name="maxPrice"
                  onChange={onPriceChange}
                />
              </div>
            </div>
            <input type="submit" value="Search" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default PriceButton;
