import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Card, Form, Button } from "react-bootstrap"; 

interface ExpenseProps {
  validated: any;
  handleSubmit: React.FormEventHandler;
  currentbalance: Number;
  numberInput: React.RefObject<HTMLInputElement>;
  error: String;
  addAmount?: React.MouseEventHandler | undefined;
  removeAmount?: React.MouseEventHandler | undefined;
}
function ExpenseForm({
  validated = false,
  handleSubmit,
  currentbalance,
  numberInput,
  error,
  addAmount,
  removeAmount,
}: ExpenseProps) {
  return (
    <Row className="mb-5 justify-content-md-center">
      <Col md={6}>
        <Card className="text-center">
          <Card.Body>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Balance : {currentbalance}</Form.Label>
                <Form.Control
                  ref={numberInput}
                  type="number"
                  name="amount"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {error}
                </Form.Control.Feedback>
              </Form.Group>
              <Button variant="outline-secondary" onClick={addAmount}>
                add
              </Button>
              <Button
                className="ms-3"
                variant="outline-secondary"
                onClick={removeAmount}
              >
                remove
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
ExpenseForm.propTypes = {
  validated: PropTypes.bool,
  handleSubmit: PropTypes.func,
  currentbalance: PropTypes.number,
  numberInput: PropTypes.func,
  error: PropTypes.string,
  addAmount: PropTypes.func,
  removeAmount: PropTypes.func
};
export default ExpenseForm;
