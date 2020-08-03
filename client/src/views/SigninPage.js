import React, { useState } from "react";
import { useHistory } from "react-router-dom";

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

function SigninPage({ callTokenHandler, setNewAdventurer }) {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();

  function navigateToAdventures() {
    history.push("/adventures");
  }

  async function handleSignIn(e) {
    e.preventDefault();
    const form = document.querySelector("form");
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      form.reset();
      return;
    }

    try {
      // sent user object to the backend through axios
      const res = await AdventurerServices.signin({
        email,
        password,
      });
      setNewAdventurer(res.data.adventurer);
      callTokenHandler(res.data.token);
      return navigateToAdventures();
    } catch (err) {
      switch (err.errorType) {
        case "invalidUser":
          setError("No such email address exists. Maybe sign it up?");
          form.reset();
          return;
        case "invalidPassword":
          setError(
            "You password is wrong. I'd normall not tell this Mr Hacker"
          );
          form.reset();
          return;
        default:
          setError(
            "Something went really wrong. Contact tech support! Tell them to send Bob"
          );
          form.reset();
          return;
      }
    }
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
            Sign In
          </h1>
          <Form onSubmit={handleSignIn}>
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

            <Button className="mt-3" variant="primary" type="submit">
              Sign In
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default SigninPage;
