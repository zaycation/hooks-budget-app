import { useState, useEffect } from "react";
import { uuid } from "uuidv4";

import ExpenseList from "./components/ExpenseList";
import ExpenseForm from "./components/ExpenseForm";
import Alert from "./components/Alert";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

/*
const initialExpenses = [
  {
    id: uuid(),
    charge: "Rent (Sample Expense)",
    amount: 1500,
  },
  {
    id: uuid(),
    charge: "Car Note (Sample Expense)",
    amount: 300,
  },
];
*/

const initialExpenses = localStorage.getItem("expenses")
  ? JSON.parse(localStorage.getItem("expenses"))
  : [];

function App() {
  // ************** state values ********************
  // all expenses, add expense
  const [expenses, setExpenses] = useState(initialExpenses);
  // single exp
  const [charge, setCharge] = useState("");
  // single amt
  const [amount, setAmount] = useState("");
  // alert msg
  const [alert, setAlert] = useState({ show: false });
  // edit
  const [edit, setEdit] = useState(false);
  // edit item
  const [id, setId] = useState(0);

  // ************** useEffect ********************
  useEffect(() => {
    //console.log("calleduseeffect");
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  // ************** functionality ********************

  const handleCharge = (e) => {
    setCharge(e.target.value);
    //console.log(`charge: ${e.target.value}`);
  };
  const handleAmount = (e) => {
    setAmount(e.target.value);
    //console.log(`amt: ${e.target.value}`);
  };
  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text });
    setTimeout(() => {
      setAlert({ show: false });
    }, 2000);
  };

  const clearAll = () => {
    setExpenses([]);
    handleAlert({ type: "danger", text: "all items have been deleted" });
    //console.log("cleared all items!");
  };

  const handleDelete = (id) => {
    let tempExpenses = expenses.filter((item) => item.id !== id);
    setExpenses(tempExpenses);
    handleAlert({ type: "danger", text: `item deleted! id ${id}` });
    //console.log(`item deleted! id ${id}`);
  };

  const handleEdit = (id) => {
    let expense = expenses.find((item) => item.id === id);
    let { charge, amount } = expense;
    setCharge(charge);
    setAmount(amount);
    setEdit(true);
    setId(id);

    //console.log(`item edited! id ${id}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log(charge, amount);
    if (charge !== "" && amount > 0) {
      if (edit) {
        let tempExpenses = expenses.map((item) => {
          return item.id === id ? { ...item, charge, amount } : item;
        });
        setExpenses(tempExpenses);
        setEdit(false);
        setId(0);
      } else {
        const singleExpense = {
          id: uuid(),
          charge,
          amount,
        };
        setExpenses([...expenses, singleExpense]);
        handleAlert({ type: "success", text: "item added!" });
      }

      setCharge("");
      setAmount("");
    } else {
      handleAlert({
        type: "danger",
        text: "charge can not be blank and amount value must be > 0",
      });
    }
  };

  return (
    <>
      {alert.show && <Alert type={alert.type} text={alert.text} />}
      <Alert className="alert" />
      <h1>budget calculator</h1>
      <main className="App">
        <ExpenseForm
          charge={charge}
          amount={amount}
          handleAmount={handleAmount}
          handleCharge={handleCharge}
          handleSubmit={handleSubmit}
          edit={edit}
        />
        <ExpenseList
          expenses={expenses}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          clearAll={clearAll}
        />
      </main>
      <h1>
        total spending:{" "}
        <span className="total">
          $
          {expenses.reduce((acc, curr) => {
            return (acc += parseInt(curr.amount));
          }, 0)}
        </span>
      </h1>
    </>
  );
}

export default App;
