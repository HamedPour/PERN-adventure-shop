import React from "react";

// Bootstap
import Container from "react-bootstrap/Container";

function PaymentResult(props) {
  console.log(props.location.state);
  return (
    <Container>
      <div>
        <h1> You've made it this far!!!</h1>
        <h2>{props.location.state && props.location.state.message}</h2>
      </div>
    </Container>
  );
}

export default PaymentResult;
