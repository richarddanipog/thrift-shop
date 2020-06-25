import React from "react";
import { shoesSizes, topSizes, bottomSizes } from "./variables";

const SizeButton = ({ onInputChange, currInput }) => {
  const sizes = (listSize, category) => {
    return listSize.map((element, i) => {
      return (
        <label key={i} className="d-block pl-2 pr-2">
          <input
            type="radio"
            name="size"
            value={element}
            checked={currInput === element}
            onChange={(e) => onInputChange(e, category)}
          />
          <span> {element}</span>
        </label>
      );
    });
  };

  return (
    <div className="gallery__filters--btn">
      <a className="card-link" data-toggle="collapse" href="#collapseOne">
        <div className="gallery__filters--btn-text">Size</div>
      </a>
      <div id="collapseOne" className="collapse" data-parent="#accordion">
        <div className="card-body">
          <ul id="sizes" className="categories">
            <li className="mb-2">
              <a className="card-link" data-toggle="collapse" href="#footwear">
                Footwear
              </a>
              <div id="footwear" className="collapse" data-parent="#sizes">
                {sizes(shoesSizes, "shoes")}
              </div>
            </li>

            <li className="mb-2">
              <a className="card-link" data-toggle="collapse" href="#tops">
                Tops
              </a>
              <div id="tops" className="collapse" data-parent="#sizes">
                {sizes(topSizes, "tops")}
              </div>
            </li>

            <li className="mb-2">
              <a className="card-link" data-toggle="collapse" href="#bottom">
                Bottoms
              </a>
              <div id="bottom" className="collapse" data-parent="#sizes">
                {sizes(bottomSizes, "bottoms")}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SizeButton;
