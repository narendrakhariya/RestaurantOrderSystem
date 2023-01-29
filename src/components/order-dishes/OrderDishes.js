import React from "react";
import "./OrderDishes.css";

const OrderDishes = ({ selectedDishes }) => {
  if (selectedDishes.length === 0) return;

  return (
    <div className="dishList">
      <table>
        <tbody>
          {selectedDishes.map((item, index) => {
            return (
              <tr key={index}>
                <td>{item.dish}</td>
                <td> - </td>
                <td>{item.serving}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default OrderDishes;
