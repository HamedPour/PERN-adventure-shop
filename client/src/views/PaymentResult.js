import React, { useEffect } from "react";

// Bootstap
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

// router
import { useHistory } from "react-router-dom";

// Redux
import { useDispatch } from "react-redux";
import { deleteCart } from "../store/actions/cartAction";

function PaymentResult(props) {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(deleteCart());
  }, [dispatch]);

  function toHomepage() {
    console.log("click");
    history.push("/");
  }

  return (
    <Container>
      <div
        hidden={props.location.state.result === "SUCCESS" ? false : true}
        style={flexContainer}
      >
        <h1 className="display-4 mb-4">
          {props.location.state && props.location.state.message}
        </h1>
        <h2>Off to adventure for you! Dont forget to take your hat!</h2>
        <img
          style={imageContainer}
          alt="Indiana Jones hat"
          src={process.env.PUBLIC_URL + "/images/hat.png"}
        />
        <Button size="lg" onClick={toHomepage}>
          HOME
        </Button>
      </div>
      <div
        hidden={props.location.state.result === "ERROR" ? false : true}
        style={flexContainer}
      >
        <h1 className="display-4">
          {props.location.state && props.location.state.message}
        </h1>
        <h2>Stuff has gone terribly wrong! It was them blasted bugs!</h2>
        <br />
        <Button size="lg" onClick={toHomepage}>
          HOME
        </Button>
      </div>
    </Container>
  );
}

export default PaymentResult;

const flexContainer = {
  display: "flex",
  flexDirection: "column",
  height: "80vh",
  alignItems: "center",
  justifyContent: "center",
};

const imageContainer = {
  width: "150px",
  margin: "50px 0",
};
