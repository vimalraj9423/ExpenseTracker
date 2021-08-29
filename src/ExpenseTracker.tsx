import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import ExpenseForm from "./ExpenseForm";

interface Props {
  balance: Number;
}
interface Transaction {
  time: Date;
  type: String;
  value: Number;
}
function ExpenseTracker(props: Props) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState("");
  const numberInput = useRef<HTMLInputElement>(null);
  const [currentbalance, setBalance] = useState(props.balance);
  const isEmptyAmount = () => {
    if (!numberInput.current || numberInput.current.value === "") {
      setValidated(true);
      setError("Amount is invalid");
      return true;
    }
    return false;
  };
  const addAmount = () => {
    if (numberInput.current && !isEmptyAmount()) {
      const addamount = parseInt(numberInput.current.value);
      console.log(addamount);
      if (currentbalance < 0) {
        setError("INVALID amount");
        setValidated(true);
      } else {
        setBalance(currentbalance.valueOf() + addamount.valueOf());
        let newTransaction: Transaction = {
          time: new Date(),
          type: "ADD",
          value: addamount,
        };
        console.log([newTransaction, ...transactions]);
        setTransactions([newTransaction, ...transactions]);
        setValidated(false);
      }

      numberInput.current.value = "";
    }
  };
  const removeAmount = () => {
    if (numberInput.current && !isEmptyAmount()) {
      const addamount = parseInt(numberInput.current.value);
      if (currentbalance < addamount) {
        setError("Insufficient balance");
        setValidated(true);
      } else {
        setBalance(currentbalance.valueOf() - addamount.valueOf());
        let newTransaction: Transaction = {
          time: new Date(),
          type: "REMOVE",
          value: addamount,
        };
        setTransactions([newTransaction, ...transactions]);
        setValidated(false);
      }
      numberInput.current.value = "";
    }
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    if (form.checkValidity() === false) {
      setError("INVALID amount");
    } else {
      addAmount();
    }
  };
  return (
    <div>
      <Container>
        <Row className="justify-content-md-center">
          <Col md={6}>
            <h1 className="text-center">Expense Tracker - Basic</h1>
          </Col>
        </Row>
        <ExpenseForm
          validated={validated}
          handleSubmit={handleSubmit}
          currentbalance={currentbalance}
          numberInput={numberInput}
          error={error}
          addAmount={addAmount}
          removeAmount={removeAmount}
        />
        {transactions.length != 0 && (
          <Row className="justify-content-md-center">
            <Col md={6}>
              <Card>
                <Card.Body>
                  {transactions.map((transaction: Transaction, index) => {
                    return (
                      <div key={index}>
                        {transaction.time?.toString()} - {transaction.value} -{" "}
                        {transaction.type}
                      </div>
                    );
                  })}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
}
ExpenseTracker.propTypes = {
  balance: PropTypes.number,
};
export default ExpenseTracker;
