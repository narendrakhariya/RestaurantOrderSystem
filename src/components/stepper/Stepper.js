import React from "react";
import "./Stepper.css";

const Setpper = ({ steps, currentStep }) => {
  return (
    <div className="stepWrapper">
      {steps.map((step, index) => (
        <div
          key={index}
          className={currentStep === index + 1 ? " selected" : ""}
        >
          <div className="step">{step}</div>
        </div>
      ))}
    </div>
  );
};

export default Setpper;
