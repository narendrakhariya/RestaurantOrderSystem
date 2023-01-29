import React from "react";
import "./Button.css";

const Button = ({ text, type, onClick, className }) => {
  return (
    <button type={type} className={"btn " + className} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
