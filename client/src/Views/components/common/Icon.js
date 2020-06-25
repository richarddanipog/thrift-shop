import React from "react";

const Icon = ({ iconName, onClick }) => {
  return (
    <span style={{ cursor: "pointer", marginRight: "1rem" }}>
      <i className={iconName} onClick={onClick} />
    </span>
  );
};

export default Icon;
