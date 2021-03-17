import React from "react";
import { MdDelete } from "react-icons/md";

import Item from "./ExpenseItem";

const ExpenseList = ({ expenses, handleEdit, handleDelete, clearAll }) => {
  return (
    <>
      <ul className="list">
        {expenses.map((expense) => {
          return (
            <Item
              key={expense.id}
              expense={expense}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />
          );
        })}
      </ul>
      {expenses.length > 0 && (
        <div className="text-center">
          <button
            type="button"
            className="btn btn-danger"
            data-toggle="tooltip"
            data-placement="bottom"
            title="Clear all above expenses (There is no undo)"
            onClick={clearAll}
          >
            Clear Expenses
            <MdDelete className="btn-icon" />
          </button>
        </div>
      )}
    </>
  );
};

export default ExpenseList;
