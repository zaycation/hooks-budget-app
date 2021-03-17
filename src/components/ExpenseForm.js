import React from "react";
import { MdSend } from "react-icons/md";

const ExpenseForm = ({
  id,
  charge,
  amount,
  handleCharge,
  handleAmount,
  handleSubmit,
  edit,
}) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="form-center">
          <div className="form-group">
            <label htmlFor="charge">Add Expense</label>
            <input
              type="text"
              className="form-control"
              id="charge"
              name="charge"
              placeholder="e.g rent"
              value={charge}
              onChange={handleCharge}
            />
          </div>

          <div className="form-group">
            <label htmlFor="amount">amount</label>
            <input
              type="number"
              className="form-control"
              id="amount"
              name="amount"
              placeholder="e.g. 100"
              value={amount}
              onChange={handleAmount}
            />
          </div>
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-success">
            {edit ? "edit" : "submit"}
            <MdSend className="btn-icon" />
          </button>
        </div>
      </form>
    </>
  );
};

export default ExpenseForm;
