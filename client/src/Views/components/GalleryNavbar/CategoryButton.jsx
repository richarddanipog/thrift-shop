import React from "react";
import { categories } from "./variables";

const ConditionButton = ({ onInputChange, currInput }) => {
  const conditionInput = () => {
    return categories.map((element, i) => {
      return (
        <label key={i} className="d-block pl-2 pr-2">
          <input
            type="radio"
            name="category"
            value={element}
            checked={currInput === element}
            onChange={onInputChange}
          />
          <span> {element}</span>
        </label>
      );
    });
  };

  return (
    <div className="gallery__filters--btn">
      <a className="card-link" data-toggle="collapse" href="#collapseFour">
        <div className="gallery__filters--btn-text">Categories</div>
      </a>
      <div id="collapseFour" className="collapse" data-parent="#accordion">
        <div className="card-body">{conditionInput()}</div>
      </div>
    </div>
  );
};

export default ConditionButton;
