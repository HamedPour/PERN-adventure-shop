import React, { useState } from "react";

// react-bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

// Axois - Adventurer Services
import AdventurerServices from "../services/AdventurerServices";

// Styling
const verticalSpacer = {
  margin: "100px 0px 50px 0px",
};

const alertStyling = {
  textAlign: "center",
  fontSize: "1.2rem",
  position: "absolute",
};

function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [error, setError] = useState();

  function handleSingup(e) {
    e.preventDefault();
    const form = document.querySelector("form");
    if (password !== confirmedPassword) {
      setError("Opps ... seems your passwords didn't match!");
      form.reset();
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      form.reset();
      return;
    }
    const adventurer = {
      email,
      password,
    };
    // sent user object to the backend through axios
    AdventurerServices.signup(adventurer);
  }

  return (
    <Container fluid>
      <Row hidden={error ? false : true}>
        <Col xs={{ span: 8, offset: 2 }} md={{ span: 4, offset: 4 }}>
          <Alert style={alertStyling} variant="danger">
            {error}
          </Alert>
        </Col>
      </Row>
      <Row>
        <Col xs={{ span: 8, offset: 2 }} md={{ span: 4, offset: 4 }}>
          <h1 className="text-center" style={verticalSpacer}>
            Sign Up
          </h1>
          <Form onSubmit={handleSingup}>
            <Form.Group controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Enter email"
              />
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
              />
            </Form.Group>

            <Form.Group controlId="confirmedPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                onChange={(e) => setConfirmedPassword(e.target.value)}
                type="password"
                placeholder="Password"
              />
            </Form.Group>

            <Button className="mt-3" variant="primary" type="submit">
              Sign Up
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default SignupPage;