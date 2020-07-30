import React from "react";

// react-bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const verticalSpacer = {
  margin: "100px 0px 50px 0px",
};

function SinginPage() {
  return (
    <Container fluid>
      <Row>
        <Col xs={{ span: 8, offset: 2 }} md={{ span: 4, offset: 4 }}>
          <h1 className="text-center" style={verticalSpacer}>
            Sign In
          </h1>
          <Form>
            <Form.Group controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
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

export default SinginPage;
