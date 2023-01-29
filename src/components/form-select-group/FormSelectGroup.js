import React from "react";
import "./FormSelectGroup.css";

const FormSelectGroup = ({ items, value, setData, error, label, name }) => {
  return (
    <div className="formControlGroup">
      <label>{label}</label>
      <select
        name={name}
        value={value}
        onChange={(e) => setData({ [name]: e.target.value })}
      >
        <option value="">--Select {name}--</option>
        {items.map((item) => {
          return <option key={item}>{item}</option>;
        })}
      </select>
      <span>{error}</span>
    </div>
  );
};

export default FormSelectGroup;
