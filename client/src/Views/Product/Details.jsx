import React from "react";

const Details = ({ user, product }) => {
  return (
    <div
      id="details"
      className="col-sm-12 col-lg-6 singleProduct__inner--details pl-5 pr-5"
    >
      <h1>{product.name}</h1>
      <span>Brand : {product.brand}</span>
      <span>Size : {product.size}</span>
      <span>Color : {product.color}</span>

      <span>
        Price : <strong>${product.price}</strong>
      </span>
      <span>Condition : {product.condition}</span>

      <p>
        <strong>Description:</strong>
        <br />
        {product.details}
      </p>

      <div className="singleProduct__inner--details-btns">
        <button>purchase</button>
        <button>offer</button>
        <button>message</button>
      </div>

      {user && (
        <div className="userProduct">
          <div className="d-flex">
            <div
              className="userProduct__img"
              style={{
                backgroundImage: `url(${
                  user.avatarUrl
                    ? `http://localhost:3500/${user.avatarUrl}`
                    : "../../../images/avatar.png"
                })`,
              }}
            />

            <span className="ml-4">{user.email}</span>
          </div>
          <div>
            <i className="fa fa-medal mr-4" title="Trusted Selller" />
            <i className="fa fa-shipping-fast" title="Fast Shipping" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Details;
