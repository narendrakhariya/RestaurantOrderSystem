import React, { useState } from "react";
import OrderDishes from "../order-dishes/OrderDishes";
import FormSelectGroup from "../form-select-group/FormSelectGroup";
import FormInputGroup from "../form-Input-group/FormInputGroup";
import Button from "../button/Button";

const Dishes = ({
  data,
  orderData,
  updateOrder,
  formErrors,
  setFormErrors,
}) => {
  const [dish, setDish] = useState("");
  const [serving, setServing] = useState(1);
  const dishes = data.dishes
    .filter(
      (item) =>
        item.availableMeals.includes(orderData.meal.toLocaleLowerCase()) &&
        item.restaurant === orderData.restaurant
    )
    .map((dish) => dish.name)
    .filter((value, index, self) => self.indexOf(value) === index);

  const ClickAddDishHandler = () => {
    //Validate data
    const errors = {};

    if (!dish) {
      errors.dish = "Please select a dish";
    }

    if (!serving) {
      errors.serving = "Please enter number of serving";
    } else if (serving < 1) {
      errors.serving = "Please enter min 1 serving";
    }

    // Condition: Total number of dishes should be max 10
    if (orderData.selectedDishes.length === 10) {
      errors.dishSummary = "Can not exceed more than 10 dishes";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // User cannot add same dish twice as the number of servings will get update for the same dish
    const hasDish = orderData.selectedDishes.some((x) => x.dish === dish);
    if (hasDish) {
      updateOrder({
        ...orderData,
        selectedDishes: orderData.selectedDishes.map((item) => {
          return item.dish === dish ? { ...item, serving: serving } : item;
        }),
      });
    } else {
      const selectedDish = {
        dish: dish,
        serving: serving,
      };
      updateOrder({
        ...orderData,
        selectedDishes: [...orderData.selectedDishes, selectedDish],
      });
    }

    // Clear selection
    setDish("");
    setServing(1);
    setFormErrors({});
  };

  return (
    <>
      <FormSelectGroup
        name="dish"
        items={dishes}
        value={dish}
        error={formErrors.dish}
        setData={(data) => setDish(data.dish)}
        label="Dishes"
      />
      <FormInputGroup
        name="serving"
        value={serving}
        error={formErrors.serving}
        setData={(data) => setServing(data.serving)}
        label="Number of serving"
        max={null}
      />
      <Button
        text="+"
        type="button"
        className="btnPlus"
        onClick={ClickAddDishHandler}
      />
      <div className="formControlGroup">
        <span>{formErrors.dishSummary}</span>
        <OrderDishes selectedDishes={orderData.selectedDishes} />
      </div>
    </>
  );
};

export default Dishes;
