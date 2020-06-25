import React from "react";

const InputSection = ({
  labelText,
  type,
  name,
  value,
  placeholder,
  onChange,
}) => {
  return (
    <div className="authForm__form--section">
      <label>{labelText}</label>
      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};

export default InputSection;
