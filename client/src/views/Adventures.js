import React, { useState, useEffect } from "react";

// Axois
import AdventureServices from "../services/AdventureServices";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../store/actions/cartAction";

// Bootstap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

// custom styling
const priceStyle = {
  fontSize: "1.3rem",
  minWidth: "100px",
};

function Adventures() {
  const dispatch = useDispatch();
  const adventurer = useSelector((state) => state.adventurer);
  const [adventures, setAdventures] = useState([]);

  async function getAdventures() {
    const adventureList = await AdventureServices.index();
    setAdventures(adventureList.data);
  }

  function handleEmbarkClick(adventure) {
    // send the adventure and the user(adventurer) to actions
    // Note, adventurer might be an empty obj allow it to pass
    dispatch(addToCart(adventure, adventurer));
  }

  useEffect(() => {
    getAdventures();
  }, []);

  return (
    <Container>
      <Row>
        {adventures.map((adventure) => {
          return (
            <Col
              key={adventure.id}
              xs={{ span: 10, offset: 1 }}
              md={{ span: 6, offset: 0 }}
            >
              <Card className="m-4 p-4">
                <Card.Img
                  variant="top"
                  src={
                    process.env.PUBLIC_URL + "/images/" + adventure.id + ".jpg"
                  }
                />
                <Card.Body>
                  <Card.Title className="text-center text-uppercase">
                    {adventure.name}
                  </Card.Title>
                  <Card.Text className="text-justify">
                    {adventure.description}
                  </Card.Text>
                  <Row className="mt-4">
                    <Col md={{ span: 4, offset: 0 }}>
                      <Button
                        onClick={() => handleEmbarkClick(adventure)}
                        variant="primary"
                      >
                        Embark
                      </Button>
                    </Col>
                    <Col md={{ span: 4, offset: 4 }}>
                      <div style={priceStyle} className="text-align-right">
                        <span>£{adventure.price.toLocaleString()}</span>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}

export default Adventures;
