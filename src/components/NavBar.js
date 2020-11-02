import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import { NavLink} from "react-router-dom";


export default class NavBar extends Component {
  render() {
    return (
      <Container>
        <header className="header">
          <h1>OS</h1>
          <nav>
            <ul>
              <li>
                <NavLink exact to="/" activeClassName="selected">
                  Order Summary
                </NavLink>
              </li>
              <li>
                <NavLink exact to="/customer-profile">
                  Customer Profile
                </NavLink>
              </li>
            </ul>
          </nav>
        </header>
      </Container>
    );
  }
}
