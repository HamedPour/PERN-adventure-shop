import React from "react";

// bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

// Redux
import { useSelector } from "react-redux";

import { useHistory } from "react-router-dom";

function HomePage() {
  const history = useHistory();
  const isLogged = useSelector((state) => state.isLogged);
  function saidYes() {
    // if user isLogged in send to adventures
    if (!isLogged) {
      return history.push("/signin");
    }
    history.push("/adventures");
    // else redirect to login page
  }

  function saidNo() {
    window.location.href = "https://www.gov.uk/self-assessment-tax-returns";
  }

  return (
    <Container>
      <Row>
        <Col className="text-center">
          <h1 className="display-4 p-4 m-4">
            Welcome <br /> weary <i>adventureless</i> traveller.
          </h1>
          <h2 style={headline}>Are you tired of an uneventful existence? </h2>
          <h3 style={headline}>Are you ready for an adventure? </h3>
        </Col>
      </Row>
      <Row style={choices} className="text-center">
        <Col>
          <Button variant="info" size="lg" onClick={saidYes}>
            YES! YES! YES!
            <br /> Save me from these kids!
          </Button>
        </Col>
        <Col>
          <Button variant="warning" size="lg" onClick={saidNo}>
            Hell No! <br /> Adventuring is dangerous!{" "}
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default HomePage;

const headline = {
  fontWeight: "300",
};

const choices = {
  marginTop: "100px",
};
