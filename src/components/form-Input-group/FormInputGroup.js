import React from "react";
import "./FormInputGroup.css";

const FormInputGroup = ({ value, setData, error, label, name, max }) => {
  return (
    <div className="formControlGroup">
      <label>{label}</label>
      <input
        name={name}
        type="number"
        value={value}
        max={max}
        min="1"
        step="1"
        onChange={(e) => setData({ [name]: e.target.value })}
      />
      <span>{error}</span>
    </div>
  );
};

export default FormInputGroup;
