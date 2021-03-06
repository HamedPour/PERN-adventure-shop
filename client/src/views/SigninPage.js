import React, { useState } from "react";
import { useHistory } from "react-router-dom";

// Redux
import { useDispatch } from "react-redux";
import { signin } from "../store/actions/isLoggedAction";
import { setToken } from "../store/actions/tokenAction";
import { setUser } from "../store/actions/userAction";

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
  left: "0",
  right: "0",
  margin: "0 auto",
};

function SigninPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();

  function navigateToAdventures() {
    history.push("/adventures");
  }

  function storeTokenInLocalStorage(aToken) {
    localStorage.setItem("token", aToken);
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
      // ALL GOOD - SETUP TOKEN AND USER
      dispatch(signin()); // this sets isLogged -> true
      dispatch(setToken(res.data.token));
      dispatch(setUser(res.data.adventurer));
      storeTokenInLocalStorage(res.data.token);
      return navigateToAdventures();
    } catch (err) {
      switch (err.message) {
        case "invalidUser":
          setError("No such email address exists. Maybe sign it up?");
          form.reset();
          return;
        case "invalidPassword":
          setError(
            "You password is wrong. I'd normall not tell you this Mr Hacker"
          );
          form.reset();
          return;
        default:
          setError(
            "Something went really wrong. Contact tech support! Tell them to send Bob"
          );
          form.reset();
          console.error(err.message);
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
          <h1 className="text-center " style={verticalSpacer}>
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
      <Row>
        <Col
          xs={{ span: 8, offset: 2 }}
          md={{ span: 4, offset: 4 }}
          className="text-center lead mt-4"
        >
          <Alert variant="info">
            Dear Adventurer,
            <br /> You can use the guest account below if you're lazy.
            <br />
            <hr />
            guest@guest.com <br /> 12345678
          </Alert>
        </Col>
      </Row>
    </Container>
  );
}

export default SigninPage;
