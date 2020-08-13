import React, { useState, useRef, useEffect } from "react";

// Redux
import { useDispatch } from "react-redux";
import { removeFromCart } from "../store/actions/cartAction";
import { connect } from "react-redux";

// Router
import { useHistory } from "react-router-dom";

// Bootstap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

function mapStateToProps(state) {
  const items = state.cart.items;
  let totalPrice = state.cart.totalPrice / 10000;
  return {
    items,
    totalPrice,
  };
}

function Cart({ items, totalPrice }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  let paypalRef = useRef();

  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: totalPrice,
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          setIsLoading(true);
          const order = await actions.order.capture();
          history.push({
            pathname: "cart/payment-result",
            state: { message: "Success", result: "SUCCESS", order },
          });
        },
        onError: (err) => {
          console.log("WTF", err);
          history.push({
            pathname: "cart/payment-result",
            state: {
              message: "An Error has occured! Please Contact Bob",
              result: "ERROR",
              err,
            },
          });
        },
      })
      .render(paypalRef);
  }, []);

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
      <Row hidden={!isLoading}>
        <Col>
          <div style={spinnerContainer}>
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          </div>
        </Col>
      </Row>
      <Row hidden={isLoading} className="mt-4">
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
                    <img
                      style={trashIconStyle}
                      alt="bin icon"
                      src={process.env.PUBLIC_URL + `/images/icons/trash.png`}
                    />{" "}
                    Remove
                  </Button>
                </div>
              </div>
            </Col>
          );
        })}
      </Row>
      <Row hidden={isLoading}>
        <Col
          className="text-center"
          xs={{ span: 12, offset: 0 }}
          md={{ span: 6, offset: 3 }}
        >
          <hr />
          {totalPrice > 0 ? (
            <Alert variant="info">
              <span style={totalStyle}>
                Grand Total: £{totalPrice.toLocaleString()}*
              </span>
              <br />
              <small>
                * super special discount coz you need an adventure in your life
              </small>
            </Alert>
          ) : (
            <Alert variant="info">
              {" "}
              <span style={totalStyle}>Cart is Empty</span>
            </Alert>
          )}
          <div hidden={totalPrice > 0 ? false : true}>
            <div style={headline}>Payment Methods</div>
            <div style={paypayBtnStyle} ref={(v) => (paypalRef = v)} />
          </div>
        </Col>
      </Row>
      <Row hidden={!isLoading}>
        <Col
          className="text-center"
          style={headline}
          xs={{ span: 12, offset: 0 }}
          md={{ span: 6, offset: 3 }}
        >
          <Alert variant="info">Proccessing! Please Stand by ...</Alert>
        </Col>
      </Row>
    </Container>
  );
}

export default connect(mapStateToProps)(Cart);

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
  fontSize: "2rem",
};

const trashIconStyle = {
  maxWidth: "24px",
};

const paypayBtnStyle = {
  width: "50%",
  margin: "0 auto",
};

const spinnerContainer = {
  display: "flex",
  height: "50vh",
  alignItems: "center",
  justifyContent: "center",
};

const headline = {
  fontSize: "1.5rem",
};
