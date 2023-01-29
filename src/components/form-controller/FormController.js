import React, { useState } from "react";
import Meal from "../meal/Meal";
import Restaurant from "../restaurant/Restaurant";
import Dishes from "../dishes/Dishes";
import Review from "../review/Review";
import Button from "../button/Button";
import Setpper from "../stepper/Stepper";
import "./FormController.css";

// This is the main component which will render all step component
const FormController = ({ data }) => {
  const STEPS = ["Step 1", "Step 2", "Step 3", "Review"];
  const [currentStep, setCurrentStep] = useState(1);
  const [formErrors, setFormErrors] = useState({});
  const [orderData, setOrderData] = useState({
    meal: "",
    restaurant: "",
    people: 1,
    selectedDishes: [],
  });

  const updateOrder = (order) => {
    setOrderData((current) => {
      return { ...current, ...order };
    });
  };

  const onClickHandler = (e) => {
    e.preventDefault();
    if (e.target.innerText === "Next") {
      const { errors, hasErrors } = validate();
      setFormErrors(errors);
      if (!hasErrors) {
        setCurrentStep((currentStep) => currentStep + 1);
      }
    }
    if (e.target.innerText === "Previous") {
      setCurrentStep((currentStep) => currentStep - 1);
    }
    if (e.target.innerText === "Submit") {
      // TODO: At present there is no server api to post this data
      console.log("Order Data:", orderData);
      window.alert("Your order placed sucessfully!");
      window.location.reload();
    }
  };

  const validate = () => {
    const errors = {};
    switch (currentStep) {
      case 1:
        if (!orderData.meal) errors.meal = "Please select a meal";
        if (!orderData.people) {
          errors.people = "Please enter number of people";
        } else if (orderData.people < 1)
          errors.people = "Please enter min 1 people";
        else if (orderData.people > 10)
          errors.people = "Please enter max 10 people";
        break;
      case 2:
        if (!orderData.restaurant)
          errors.restaurant = "Please select restaurant";
        break;
      case 3:
        const sumOfServing = orderData.selectedDishes.reduce(
          (accumulator, item) => {
            return accumulator + Number(item.serving);
          },
          0
        );

        // Condition: The total number of dishes (i.e Number of dishes * respective serving)
        // should be greater or equal to the number of people selected in Step 1 and a maximum of 10 is allowed.
        if (orderData.selectedDishes.length === 0) {
          errors.dishSummary = "Please add dishes and no. of serving";
        } else if (
          orderData.selectedDishes.length * sumOfServing <
          orderData.people
        ) {
          errors.dishSummary =
            "Selected dishes and respective serving is not enough for entered (" +
            orderData.people +
            ") people!";
        }
        break;
    }
    return {
      errors,
      hasErrors: Object.keys(errors).length > 0,
    };
  };

  const renderOrderSteps = () => {
    switch (currentStep) {
      case 1:
        return (
          <Meal
            orderData={orderData}
            updateOrder={updateOrder}
            formErrors={formErrors}
          />
        );
      case 2:
        return (
          <Restaurant
            data={data}
            orderData={orderData}
            updateOrder={updateOrder}
            formErrors={formErrors}
          />
        );
      case 3:
        return (
          <Dishes
            data={data}
            orderData={orderData}
            updateOrder={updateOrder}
            formErrors={formErrors}
            setFormErrors={setFormErrors}
          />
        );
      case 4:
        return <Review orderData={orderData} />;
    }
  };

  return (
    <div className="container">
      <Setpper steps={STEPS} currentStep={currentStep} />
      <form>
        {renderOrderSteps()}
        {currentStep !== 1 && (
          <Button
            text="Previous"
            className="btnLeft"
            onClick={onClickHandler}
            type="submit"
          />
        )}
        <Button
          text={currentStep === STEPS.length ? "Submit" : "Next"}
          onClick={onClickHandler}
          className="btnRight"
          type="submit"
        />
      </form>
    </div>
  );
};

export default FormController;
