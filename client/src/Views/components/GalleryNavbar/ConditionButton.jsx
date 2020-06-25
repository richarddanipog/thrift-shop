import React from "react";
import { conditions } from "./variables";

const ConditionButton = (props) => {
  const conditionInput = () => {
    return conditions.map((element, i) => {
      return (
        <label key={i} className="d-block pl-2 pr-2">
          <input
            type="radio"
            name="condition"
            value={element}
            checked={props.currInput === element}
            onChange={props.onInputChange}
          />
          <span> {element}</span>
        </label>
      );
    });
  };

  return (
    <div className="gallery__filters--btn">
      <a className="card-link" data-toggle="collapse" href="#collapseThree">
        <div className="gallery__filters--btn-text">Condition</div>
      </a>
      <div id="collapseThree" className="collapse" data-parent="#accordion">
        <div className="card-body">{conditionInput()}</div>
      </div>
    </div>
  );
};

export default ConditionButton;
