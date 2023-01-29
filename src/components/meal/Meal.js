import React from "react";
import FormInputGroup from "../form-Input-group/FormInputGroup";
import FormSelectGroup from "../form-select-group/FormSelectGroup";

const Meal = ({ orderData, updateOrder, formErrors }) => {
  const meals = ["Breakfast", "Lunch", "Dinner"];
  return (
    <>
      <FormSelectGroup
        name="meal"
        items={meals}
        value={orderData.meal}
        setData={(data) => {
          updateOrder({
            ...data,
            restaurant: "",
          });
        }}
        error={formErrors.meal}
        label="Meal"
      />
      <FormInputGroup
        name="people"
        value={orderData.people}
        setData={(data) => {
          updateOrder(data);
        }}
        error={formErrors.people}
        label="Enter number of people"
        max={10}
      />
    </>
  );
};

export default Meal;
