import React from "react";
import OrderDishes from "../order-dishes/OrderDishes";
import "./Review.css";

const Review = ({ orderData }) => {
  return (
    <div className="row">
      <div className="column left">
        <label>Meal</label>
      </div>
      <div className="column right">
        <label>{orderData.meal}</label>
      </div>
      <div className="column left">
        <label>No. of People</label>
      </div>
      <div className="column right">
        <label>{orderData.people}</label>
      </div>
      <div className="column left">
        <label>Restaurant</label>
      </div>
      <div className="column right">
        <label>{orderData.restaurant}</label>
      </div>
      <div className="column left">
        <label>Dishes</label>
      </div>
      <div className="column right">
        <OrderDishes selectedDishes={orderData.selectedDishes} />
      </div>
    </div>
  );
};

export default Review;
