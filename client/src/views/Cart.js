import React from "react";

// Redux
import { useDispatch } from "react-redux";
import { removeFromCart } from "../store/actions/cartAction";
import { connect } from "react-redux";

// Bootstap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";

// styles
const imageStyle = {
  maxWidth: "100px",
  padding: "10px",
};

const cartContainer = {
  display: "flex",
  border: "1px solid lightblue",
};

const spacer = {
  flex: "1",
};

const btnContainer = {
  margin: "20px",
};

const titleStyle = {
  fontWeight: "400",
  fontSize: "1.5rem",
};

const priceStyle = {
  fontWeight: "300",
  fontSize: "1.2rem",
};

const totalStyle = {
  fontSize: "1.5rem",
};

function mapStateToProps(state) {
  const items = state.cart.items;
  let totalPrice = state.cart.totalPrice;
  return {
    items,
    totalPrice,
  };
}

function Cart({ items, totalPrice }) {
  const dispatch = useDispatch();

  function removeItemFromCart(id, price) {
    dispatch(removeFromCart({ id, price }));
  }

  return (
    <Container>
      <Row>
        <Col>
          <h1 className="display-4 m-4 text-center">Shopping Cart</h1>
        </Col>
      </Row>
      <Row className="mt-4">
        {items.map((adventure) => {
          return (
            <Col
              className="mb-4"
              key={adventure.id}
              xs={{ span: 12, offset: 0 }}
              md={{ span: 6, offset: 3 }}
            >
              <div style={cartContainer}>
                <img
                  style={imageStyle}
                  alt={adventure.name}
                  src={
                    process.env.PUBLIC_URL + "/images/" + adventure.id + ".jpg"
                  }
                />
                <div className="ml-4 mr-4">
                  <h3 style={titleStyle}>{adventure.name}</h3>
                  <h4 style={priceStyle}>
                    price: £{adventure.price.toLocaleString()}
                  </h4>
                </div>
                <div style={spacer} />
                <div style={btnContainer}>
                  <Button
                    onClick={() =>
                      removeItemFromCart(adventure.id, adventure.price)
                    }
                    variant="danger"
                  >
                    Remove
                  </Button>
                </div>
              </div>
            </Col>
          );
        })}
      </Row>
      <Row>
        <Col
          className="text-center"
          xs={{ span: 12, offset: 0 }}
          md={{ span: 6, offset: 3 }}
        >
          <hr />
          <Alert variant="info">
            <span style={totalStyle}>
              Grand Total: £{totalPrice.toLocaleString()}
            </span>
          </Alert>
          <Button size="lg">Checkout</Button>
        </Col>
      </Row>
    </Container>
  );
}

export default connect(mapStateToProps)(Cart);
