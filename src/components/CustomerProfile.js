import React, { Component } from 'react';
import { Container, Row, Col, Image } from "react-bootstrap";
import customerProfileImage from "../img/customer-profile.jpg";
import axios from "axios";
import NavBar from './NavBar';

const url = "https://indapi.kumba.io/webdev/assignment";

export default class CustomerProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      userDetails: [],
      likes: [],
      dislikes: [],
      isLoading: true,
    };
  }

  componentDidMount() {
    axios(url)
      .then((res) => {
        this.setState({ userDetails: res.data.user });
        this.setState({ likes: res.data.user.likes });
        this.setState({ dislikes: res.data.user.dislikes });
      })
      .catch((error) => this.setState({ error }));
  }

  render() {
    const { userDetails, error, likes, dislikes } = this.state;

    // Error handling
    if (error) {
      return (
        <p
          style={{
            color: "crimson",
            fontWeight: "600",
            textAlign: "center",
            marginTop: "2.5rem",
          }}
        >
          Something went wrong!
        </p>
      );
    }
    return (
      <Container>
        <NavBar />
        <div style={{marginTop:"3.5rem"}}>
          <Row>
            <Col className="user-profile" sm={12} md={4}>
              <div className="user-profile-image">
                <Image
                  src={customerProfileImage}
                  alt="customer profile image"
                  width="200"
                  height="200"
                  roundedCircle
                />
              </div>
              <div className="user-profile-details">
                <h3>{userDetails.name}</h3>
              </div>
            </Col>
            <Col sm={12} md={8}>
              <div style={{position:"relative", left:"15%"}} className="personal-container">
                <div className="personal-details">
                  <h3>Personal Information</h3>
                  <div className="phone">
                    <p className="text-muted">Phone Number</p>
                    <h4>{userDetails.phone}</h4>
                  </div>
                  <div className="address">
                    <p className="text-muted">Address</p>
                    <h4>{userDetails.address}</h4>
                  </div>
                </div>
                <div className="about-details">
                  <h3>About</h3>
                  <div>
                    <p className="text-muted">About Me</p>
                    <h4 style={{marginBottom:"1.4rem"}}>{userDetails.about}</h4>
                    <p className="text-muted">Likes</p>
                    <ul>
                      {likes.map((like, index) => (
                        <li key={index}>{like}</li>
                      ))}
                    </ul>
                    <p className="text-muted">Dislikes</p>
                    <h4>
                      <ul>
                        {dislikes.map((dislike, index) => (
                          <li key={index}>{dislike}</li>
                        ))}
                      </ul>
                    </h4>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    );
  }
}
