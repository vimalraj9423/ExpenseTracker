import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ExpenseTracker from "./ExpenseTracker";
function App() {
  return (
    <div className="App">
      <ExpenseTracker balance={5000} />
    </div>
  );
}

export default App;
