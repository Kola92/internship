import React, { Component } from "react";
import { Container, Row, Col, Card, ListGroup } from "react-bootstrap";
import axios from "axios";
import NavBar from "./NavBar";

const url = "https://indapi.kumba.io/webdev/assignment";

export default class OrderSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      items: [],
      userDetails: [],
      restaurantDetails:[],
      isLoading: true,
    };
  }

  componentDidMount() {
    // Fetch api data
    axios(url)
      .then((res) => {
        this.setState({ items: res.data.items });
        this.setState({ userDetails: res.data.user });
        this.setState({ restaurantDetails: res.data.restaurant });
      })
      .catch((error) => this.setState({ error }));
  }

  render() {
    // Destructure to get current state
    const { items, userDetails, isLoading, restaurantDetails, error } = this.state;

    // Sum up item quantity
    const mappedQty = items.map((item) => item.quantity);
    const qtySum = mappedQty.reduce((accumulator, currentItem) => {
      return accumulator + currentItem;
    }, 0);

    // Sum up item price
    const mappedPrice = items.map((item) => item.price);
    const priceSum = mappedPrice.reduce((accumulator, currentItem) => {
      return accumulator + currentItem;
    }, 0);

    // Calculate tax
    const mappedTax = items.map((item) => item.tax_pct);
    const taxSum = mappedTax.reduce((accumulator, currentItem) => {
      return accumulator + currentItem;
    }, 0);
    const tax = (taxSum / 100) * priceSum;

    // Error handling
    if(error) {
      return <p style={{color:"crimson", fontWeight:"600", textAlign:"center",marginTop:"2.5rem"}}>Something went wrong!</p>
    }

    return (
      <Container>
        <NavBar />
        <Row style={{padding:"4rem 0"}}>
          <Col sm={7}>
            <div className="customer-details">
              <h2 className="customer-details-title text-center">
                Customer Details
              </h2>
              <Card>
                <Card.Header>Customer Details</Card.Header>
                <Card.Body>
                  {console.log(userDetails.address)}

                  {isLoading && (
                    <div className="user-details">
                      <div>
                        <span>Name: </span>
                        {userDetails.name}
                      </div>
                      <div>
                        <span>Address: </span> {userDetails.address}
                      </div>
                      <div>
                        <span>Phone Number: </span> {userDetails.phone}
                      </div>
                    </div>
                  )}
                </Card.Body>
              </Card>
            </div>

            <div className="restaurant-details">
              <h2 className="restaurant-details-title text-center">
                Restaurant Details
              </h2>
              <Card>
                <Card.Header>Restaurant Details</Card.Header>
                <Card.Body>
                  {console.log(userDetails.address)}

                  {isLoading && (
                    <div className="restaurant-details">
                      <div>
                        <span>Name: </span>
                        {restaurantDetails.name}
                      </div>
                      <div>
                        <span>Street: </span> {restaurantDetails.street}
                      </div>
                      <div>
                        <span>City: </span> {restaurantDetails.city}
                      </div>
                      <div>
                        <span>State: </span> {restaurantDetails.state}
                      </div>
                      <div>
                        <span>Zipcode: </span> {restaurantDetails.zipcode}
                      </div>
                    </div>
                  )}
                </Card.Body>
              </Card>
            </div>
          </Col>

          <Col sm={5}>
            <h2 className="order-summary-title">Order Summary</h2>
            <Card>
              <Card.Header>
                <span>
                  YOUR ORDER
                  <h3
                    id="order-id"
                    style={{ display: "inline", fontWeight: "600" }}
                  >
                    {`(${qtySum} items)`}
                  </h3>
                </span>
              </Card.Header>
              <Card.Body>
                {items.map((item) => (
                  <div className="item-details" key={item.order_id}>
                    <ListGroup variant="">
                      <ListGroup.Item>
                        <span className="item-name">{item.name}</span>
                        <div>
                          <span>Category: </span>
                          {item.category}
                        </div>
                        <div className="">
                          <span>Price: </span>
                          {`₹${item.price}`}
                        </div>
                        <div>
                          <span>Tax: </span>
                          {`${item.tax_pct}%`}
                        </div>
                        <div>
                          <span>Quantity: </span>
                          {item.quantity}
                        </div>
                      </ListGroup.Item>
                    </ListGroup>
                  </div>
                ))}
              </Card.Body>
              <Card.Footer>
                <div>
                  <span>Subtotal</span>{" "}
                  <span className="float-right">{`₹${priceSum}`}</span>
                </div>
                <div>
                  <span>Tax</span>{" "}
                  <span className="float-right">{`₹${tax}`}</span>
                </div>
                <div className="mt-3" style={{ fontWeight: "700" }}>
                  <span>Total</span>{" "}
                  <span
                    className="float-right"
                    style={{ color: "crimson" }}
                  >{`₹${tax + priceSum}`}</span>
                </div>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}
