import React from "react";
import FormSelectGroup from "../form-select-group/FormSelectGroup";

const Restaurant = ({ data, orderData, updateOrder, formErrors }) => {
  const restaurants = data.dishes
    .filter((item) =>
      item.availableMeals.includes(orderData.meal.toLocaleLowerCase())
    )
    .map((item) => item.restaurant)
    .filter((value, index, self) => self.indexOf(value) === index);

  return (
    <FormSelectGroup
      name="restaurant"
      items={restaurants}
      value={orderData.restaurant}
      setData={(data) => {
        updateOrder({
          ...data,
          selectedDishes: [],
        });
      }}
      error={formErrors.restaurant}
      label="Restaurant"
    />
  );
};

export default Restaurant;
